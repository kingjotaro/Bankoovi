import Account from "../../../database/schemas/accountModel";
import { ClientSession } from "mongoose";

async function deleteAccount(_id: string, session: ClientSession) {
  await Account.deleteOne({ _id }, { session });
}

export { deleteAccount };
