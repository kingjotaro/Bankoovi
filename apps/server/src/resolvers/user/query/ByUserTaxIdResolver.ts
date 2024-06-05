import { Query, Resolver, Arg } from "type-graphql";
import User from "../../../database/schemas/userModel";
import { typeUser } from "../../../graphqlTypes/typesUser";

@Resolver()
export class ByUserTaxIdResolver {
  @Query(() => typeUser)
  async ByUserTaxId(@Arg("UserTaxId") TaxId: number) {
    let checkquery = await User.findOne({
      TaxId: TaxId,
    });
    if (checkquery) {
      return checkquery;
    } else throw new Error("TaxId not found");
  }
}
