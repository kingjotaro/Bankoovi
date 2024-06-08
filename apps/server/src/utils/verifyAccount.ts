import Account from "../database/schemas/accountModel";
import { typeAccountInput } from "../graphqlTypes/typesAccount";

async function verifyAccount(newAccount: typeAccountInput) {
  let checkAccountNumber = await Account.findOne({
    accountNumber: newAccount.accountNumber,
  });
  if (checkAccountNumber) {
    throw new Error("This account number is already taken");
  }
}

export { verifyAccount };
