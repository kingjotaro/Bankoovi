import Account from "../../database/schemas/accountModel";


async function verifyIfAccountExist(findAccount: number) {
  let checkAccountNumber = await Account.findOne({ accountNumber: findAccount,
  });
  return checkAccountNumber ? true : false;
}
   

export { verifyIfAccountExist };
