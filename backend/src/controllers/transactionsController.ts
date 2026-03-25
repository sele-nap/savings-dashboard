import { Request, Response } from 'express';
import Fund from '../models/Fund';
import Transaction from '../models/Transaction';

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find({ userId: req.user!._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, rib, bic, allocations } = req.body;
    const transactionDate = new Date();
    const dateStr = transactionDate.toISOString().split('T')[0];

    const totalPercent = allocations.reduce(
      (sum: number, a: { allocationPercent: number }) => sum + a.allocationPercent,
      0
    );
    if (Math.round(totalPercent) !== 100) {
      res.status(400).json({ message: 'Allocations must sum to 100%' });
      return;
    }

    const enrichedAllocations = await Promise.all(
      allocations.map(async (a: { fundIsin: string; allocationPercent: number }) => {
        const fund = await Fund.findOne({ isin: a.fundIsin });
        if (!fund) throw new Error(`Fund ${a.fundIsin} not found`);

        const sorted = [...fund.valorisations].sort((x, y) =>
          x.date < y.date ? -1 : 1
        );
        const valuation = sorted.filter((v) => v.date <= dateStr).at(-1);
        if (!valuation) throw new Error(`No valuation found for fund ${a.fundIsin}`);

        const investedAmount = (amount * a.allocationPercent) / 100;
        const sharesBought = investedAmount / valuation.value;

        return {
          fundIsin: a.fundIsin,
          fundName: fund.fundName,
          allocationPercent: a.allocationPercent,
          sharesBought,
          pricePerShareAtDate: valuation.value,
        };
      })
    );

    const transaction = new Transaction({
      userId: req.user!._id,
      amount,
      rib,
      bic,
      date: transactionDate,
      allocations: enrichedAllocations,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    res.status(500).json({ message });
  }
};
