import { Query, Resolver, Arg } from "type-graphql";
import User from "../../../database/schemas/userModel";
import { typeUser } from "../../../graphqlTypes/typesUser";
import CustomError from "../../../utils/errors/customError";

@Resolver()
export class ByUserTaxIdResolver {
  @Query(() => typeUser)
  async ByUserTaxId(@Arg("UserTaxId") TaxId: number) {
    const user = await User.findOne({ taxId: TaxId });

    if (!user) {
      throw new CustomError("UserNotFound", "User Not Found!");
    }

    return user;
  }
}
