import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  taxId: { type: Number, required: true, unique: true },
  password: { type: String, required: true }
});


userSchema.index({ taxId: 1, name: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;
