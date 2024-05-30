import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {String, required: true},
  taxId: {Number, required: true, unique:true},
  password: {String, required: true}
});

const User = mongoose.model("User", userSchema);
export default User;
