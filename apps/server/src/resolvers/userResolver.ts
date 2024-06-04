import { Mutation, Query, Resolver, Arg } from "type-graphql";
import User from "../database/schemas/userModel";
import {
    typeUser,
    typeUserInput,
} from "../graphqlTypes/typesUser";

@Resolver()
export class UserResolver {
  @Query(() => typeUser)
  async ByUserTaxId(@Arg("UserTaxId") UserTaxId: number) {
    let checkquery = await User.findOne({
        UserTaxId: UserTaxId,
    }).lean();
    if (checkquery) {
      return checkquery;
    } else throw new Error("TaxId not found");
  }

  @Query(() => typeUser)
  async ByObjectId(@Arg("ObjectId") _id: string) {
    let checkquery = await User.findOne({ _id: _id });
    if (checkquery) {
      return checkquery;
    } else throw new Error("UserId not found");
  }

  @Mutation(() => typeUser)
  async ByNewUser(@Arg("NewUser") newUser: typeUserInput) {
    let checkUserId = await User.findOne({ taxId: newUser.taxId });
    if (checkUserId) {
      throw new Error("A user with this ID already has an User");
    }
      const createdUser = await User.create({...newUser});
      return createdUser;
    
  }
}
