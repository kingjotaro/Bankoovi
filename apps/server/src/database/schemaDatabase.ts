import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: String,
  taxId: Number,
  password: String,
});

// Definição do modelo
const Account = mongoose.model("Account", accountSchema);
export default Account;
