import Account from "../../mongodb/schemas/accountModel";


async function verifyIfAccountExist(findAccount: number) {
  const checkAccountNumber = await Account.findOne({ accountNumber: findAccount,
  });
  return checkAccountNumber ? true : false;
}
   

export { verifyIfAccountExist };
