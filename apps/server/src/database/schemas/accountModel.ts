import mongoose from "mongoose";


const accountSchema = new mongoose.Schema(
  {
    accountNumber: { type: Number, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      // retornando null
    },
    balance: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
