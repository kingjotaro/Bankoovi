import { Mutation, Query, Resolver, Arg } from "type-graphql";
import User from "../database/schemas/userModel";
import { typeAccount, typeAccountInput } from "../graphqlTypes/typesUser";

@Resolver()
export class userResolvers {
  @Query(() => typeAccount)
  async ByName(@Arg("name") name: string) {
    let checkquery = await User.findOne({ name: name }).lean();
    if (checkquery) {
      return checkquery;
    } else throw new Error("Date not found");
  }

  @Query(() => typeAccount)
  async ByTaxId(@Arg("taxId") taxId: number) {
    let checkquery = await User.findOne({ taxId: taxId }).lean();
    if (checkquery) {
      return checkquery;
    } else throw new Error("TaxId not found");
  }

  @Mutation(() => typeAccount)
  async createNewUser(@Arg("createNewUser") createNewUser: typeAccountInput) {
    let checkcreate = await User.findOne({ taxId: createNewUser.taxId });
    if (checkcreate) {
      throw new Error("User already exist, cannot create another");
    }
    const { name, taxId, password } = createNewUser;
    return await User.create({ name, taxId, password });
  }

  @Mutation(() => typeAccount)
  async editUser(@Arg("editUser") editUser: typeAccountInput) {
    let editCheck = await User.findOne({ editUser: editUser.taxId });
    if (editCheck) {
      const { name, taxId, password } = editUser;

      const update = { name, taxId, password } 

      return await User.findOneAndUpdate({ taxId }, update, { new: true });
    }
    throw new Error(`User with CPF:${editUser.taxId} not found!!`);
  }

  @Mutation(() => String)
  async removeUser(@Arg("deleteUser") taxId: number) {
    let checkremove = await User.findOne({ taxId: taxId });
    if (checkremove) {
      await User.deleteOne({ taxId: taxId });
      return `User with CPF:${taxId} deleted`;
    }
    throw new Error(`User with CPF:${taxId} not found!!`);
  }
}
