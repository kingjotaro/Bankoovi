import { Mutation, Query, Resolver, Arg } from "type-graphql";
import Account from "../database/schemas/accountModel";
import {
  typeAccount,
  typeAccountInput,
} from "../graphqlTypes/typesAccountModel";

@Resolver()
export class accountResolver {
  @Query(() => typeAccount)
  async ByAccountNumber(@Arg("AccountNumber") accountNumber: number) {
    let checkquery = await Account.findOne({
      accountNumber: accountNumber,
    }).lean();
    if (checkquery) {
      return checkquery;
    } else throw new Error("Account number not found");
  }

  @Query(() => typeAccount)
  async ByUserId(@Arg("UserId") userId: string) {
    let checkquery = await Account.findOne({ userId: userId });
    if (checkquery) {
      return checkquery;
    } else throw new Error("UserId not found");
  }

  @Mutation(() => typeAccount)
  async ByNewAccount(@Arg("NewAccount") newAccount: typeAccountInput) {
    let checkUserId = await Account.findOne({ userId: newAccount.userId });
    if (checkUserId) {
      throw new Error("A user with this ID already has an account");
    }

    let checkAccountNumber = await Account.findOne({ accountNumber: newAccount.accountNumber });
    if (checkAccountNumber) {
        throw new Error("This account number is already taken");
      }

      const { accountNumber, userId, balance } = newAccount;
      const createdAccount = await Account.create({
        accountNumber: accountNumber,
        userId: userId,
        balance: balance ?? 0,
        // objectID vai aqui??
      });
      return createdAccount;
    
  }
}
