import { Query, Resolver, Arg } from "type-graphql";
import User from "../../../mongodb/schemas/userModel";
import { typeUser } from "../../../graphqlTypes/typesUser";

@Resolver()
export class UserByUserTaxIdResolver {
  @Query(() => typeUser)
  async UserByUserTaxId(@Arg("UserTaxId") TaxId: number) {
    const user = await User.findOne({ taxId: TaxId });

    if (!user) {
      throw new Error("User Not Found!");
    }

    return user;
  }
}
