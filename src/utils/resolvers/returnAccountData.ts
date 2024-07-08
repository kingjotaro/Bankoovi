import Account from "../../mongodb/schemas/accountModel";


export default async function returnAccountData(findAccount: number) {
  const checkAccountNumber = await Account.findOne({ accountNumber: findAccount,
  });
  if (checkAccountNumber) {
   return checkAccountNumber;
  }

  throw new Error(`This account number ${findAccount} not found data`);
}

;
