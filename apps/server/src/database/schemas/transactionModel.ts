import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    origin: {  type: mongoose.Types.ObjectId,
        ref: "Account",
        required: true,},
    senderAccount: {type: Number, required: true},
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    receiverAccount: {type: Number, required: true},
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["Debit", "Credit"], required: true}

   
  },
  { timestamps: true } 
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
