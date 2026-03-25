import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAllocation {
  fundIsin: string;
  fundName: string;
  allocationPercent: number;
  sharesBought: number;
  pricePerShareAtDate: number;
}

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  amount: number;
  rib: string;
  bic: string;
  date: Date;
  allocations: IAllocation[];
}

const AllocationSchema = new Schema<IAllocation>({
  fundIsin: { type: String, required: true },
  fundName: { type: String, required: true },
  allocationPercent: { type: Number, required: true },
  sharesBought: { type: Number, required: true },
  pricePerShareAtDate: { type: Number, required: true },
});

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    rib: { type: String, required: true },
    bic: { type: String, required: true },
    date: { type: Date, default: Date.now },
    allocations: [AllocationSchema],
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
