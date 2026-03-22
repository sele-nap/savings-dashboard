import { Request, Response } from 'express';
import Fund from '../models/Fund';
import Transaction from '../models/Transaction';

const getValuationAtDate = (
  valorisations: { date: string; value: number }[],
  dateStr: string
): number | null => {
  const sorted = [...valorisations].sort((a, b) => (a.date < b.date ? -1 : 1));
  const match = sorted.filter((v) => v.date <= dateStr).at(-1);
  return match ? match.value : null;
};

export const getPortfolioSummary = async (_req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    const funds = await Fund.find();
    const today = new Date().toISOString().split('T')[0];

    const fundMap = new Map(funds.map((f) => [f.isin, f]));

    let totalCurrentValue = 0;
    let totalInvested = 0;
    const fundBreakdown: Record<string, { fundName: string; currentValue: number }> = {};

    for (const tx of transactions) {
      totalInvested += tx.amount;
      for (const alloc of tx.allocations) {
        const fund = fundMap.get(alloc.fundIsin);
        if (!fund) continue;

        const currentPrice = getValuationAtDate(fund.valorisations, today);
        if (currentPrice === null) continue;

        const currentValue = alloc.sharesBought * currentPrice;
        totalCurrentValue += currentValue;

        if (!fundBreakdown[alloc.fundIsin]) {
          fundBreakdown[alloc.fundIsin] = { fundName: alloc.fundName, currentValue: 0 };
        }
        fundBreakdown[alloc.fundIsin].currentValue += currentValue;
      }
    }

    res.json({
      totalInvested,
      totalCurrentValue,
      performancePercent:
        totalInvested > 0
          ? ((totalCurrentValue - totalInvested) / totalInvested) * 100
          : 0,
      fundBreakdown,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPortfolioHistory = async (_req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find().sort({ date: 1 });
    if (transactions.length === 0) {
      res.json([]);
      return;
    }

    const funds = await Fund.find();
    const fundMap = new Map(funds.map((f) => [f.isin, f]));

    const allDates = new Set<string>();
    funds.forEach((f) => f.valorisations.forEach((v) => allDates.add(v.date)));
    const sortedDates = Array.from(allDates).sort();

    const firstTxDate = transactions[0].date.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    const lastValuationDate = sortedDates.at(-1) ?? today;
    const chartStart = firstTxDate <= lastValuationDate ? firstTxDate : lastValuationDate;

    const history = sortedDates
      .filter((d) => d >= chartStart && d <= today)
      .map((date) => {
        let totalValue = 0;

        for (const tx of transactions) {
          const txDate = tx.date.toISOString().split('T')[0];
          const effectiveTxDate = txDate <= lastValuationDate ? txDate : lastValuationDate;
          if (effectiveTxDate > date) continue;

          for (const alloc of tx.allocations) {
            const fund = fundMap.get(alloc.fundIsin);
            if (!fund) continue;

            const price = getValuationAtDate(fund.valorisations, date);
            if (price === null) continue;

            totalValue += alloc.sharesBought * price;
          }
        }

        return { date, value: totalValue };
      });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
