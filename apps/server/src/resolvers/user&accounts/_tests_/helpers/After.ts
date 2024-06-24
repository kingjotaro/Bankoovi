import mongoose from "mongoose";
import { deleteUser } from "../../helpers/deleteUser";
import { deleteAccount } from "../../helpers/deleteAccount";
import User from "../../../../database/schemas/userModel";
import Account from "../../../../database/schemas/accountModel";

async function After() {
  const session = await mongoose.startSession();
  session.startTransaction();
  const account = await Account.findOne({ AccountNumber: 123456789 });
  if (account) {
    await deleteAccount(account?._id.toString(), session);
  }

  const user = await User.findOne({ taxId: 123456789 });
  if (user) {
    await deleteUser(user?._id.toString(), session);
  }

  await session.commitTransaction();
  await session.endSession();
  await mongoose.connection.close();
  return console.log('data apanga')
}

export default After;