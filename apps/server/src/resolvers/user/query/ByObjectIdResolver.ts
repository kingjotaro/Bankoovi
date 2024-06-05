import { Query, Resolver, Arg } from "type-graphql";
import User from "../../../database/schemas/userModel";
import { typeUser } from "../../../graphqlTypes/typesUser";

@Resolver()
export class ByObjectIdResolver {
  @Query(() => typeUser)
  async ByObjectId(@Arg("ObjectId") _id: string) {
    const user = await User.findById(_id);
    if (user) {
      return user;
    } else {
      throw new Error("UserId not found");
    }
  }
}
