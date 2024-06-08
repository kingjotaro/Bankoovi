import mongoose from "mongoose";


const accountSchema = new mongoose.Schema(
  {
    accountNumber: { type: Number, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    history: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    }]

  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
