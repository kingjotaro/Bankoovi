import Account from "../../../mongodb/schemas/accountModel";
import { typeAccountInput } from "../../../graphqlTypes/typesAccount";
import { ClientSession } from "mongoose";

async function createAccount(newAccount: typeAccountInput, userId: string, session: ClientSession) {
  const createdAccount = await Account.create([{ ...newAccount, userId }], { session });
  return createdAccount[0];
}

export { createAccount };