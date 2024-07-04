import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountNumber: { type: Number, required: true, unique: true },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
