import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    idempotencyKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
