import { Query, Resolver, Arg } from "type-graphql";
import Account from "../../../mongodb/schemas/accountModel";
import { typeAccount } from "../../../graphqlTypes/typesAccount";

@Resolver()
export class AccountByAccountNumberResolver {
  @Query(() => typeAccount)
  async AccountByAccountNumber(@Arg("accountNumber") accountNumber: number) {
    const user = await Account.findOne({ accountNumber: accountNumber });

    if (!user) {
      throw new Error("Account Not Found!");
    }

    return user;
  }
}

