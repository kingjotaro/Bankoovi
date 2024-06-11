import Account from "../../database/schemas/accountModel";


async function verifyIfAccountExist(findAccount: number) {
  let checkAccountNumber = await Account.findOne({ accountNumber: findAccount,
  });
  if (checkAccountNumber) {
    throw new Error("This account number is already taken");
  }
  return false
}

export { verifyIfAccountExist };
