import { Query, Resolver, Arg } from "type-graphql";
import Account from "../../../database/schemas/accountModel";

@Resolver()
export class AccountBynumberResolver {
  @Query(() => String, { nullable: true })
  async accountBynumber(@Arg("AccountNumber") AccountNumber: number) {
    
      const account = await Account.findOne({ AccountNumber: AccountNumber });
      if (!account) {
        return null;
      }
      return account;
    } 
  }
