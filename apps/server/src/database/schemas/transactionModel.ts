import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transaction_ID: { type: String, unique: true, required: true },
    senderAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      
    },
    receiverAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
