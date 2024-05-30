import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transaction_ID: {String, unique: true},
  senderAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'Balance', required: true },
  receiberAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'Balance', required: true }
 
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
