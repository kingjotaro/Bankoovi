import Account from "../../database/schemas/accountModel";


async function returnAccountData(findAccount: number) {
  let checkAccountNumber = await Account.findOne({ accountNumber: findAccount,
  });
  if (checkAccountNumber) {
   return checkAccountNumber;
  }
  throw new Error("This account number not found data");
}

export { returnAccountData };
