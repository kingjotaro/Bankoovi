import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: String,
  taxId: Number,
  password: String,
});

const Account = mongoose.model("Account", accountSchema);
export default Account;
