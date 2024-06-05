import { Query, Resolver, Arg } from "type-graphql";
import Account from "../../database/schemas/accountModel";
import { typeAccount } from "../../graphqlTypes/typesAccount";

@Resolver()
export class AccountResolver {
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
}
