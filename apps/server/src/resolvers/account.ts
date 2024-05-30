import { Mutation, Query, Resolver, Arg } from "type-graphql";
import Account from "../database/schemas/accountModel";
import { typeAccount, typeAccountInput } from "../graphqlTypes/typesAccount";

@Resolver()
export class userResolvers {
  @Query(() => typeAccount)
  async ByName(@Arg("name") name: string) {
    let checkquery = await Account.findOne({ name: name });
    if (checkquery) {
      return checkquery;
    } else throw new Error("Date not found");
  }

  @Query(() => typeAccount)
  async ByTaxId(@Arg("taxId") taxId: number) {
    let checkquery = await Account.findOne({ taxId: taxId });
    if (checkquery) {
      return checkquery;
    } else throw new Error("TaxId not found");
  }

  @Mutation(() => typeAccount)
  async createNewUser(@Arg("createNewUser") createNewUser: typeAccountInput) {
    let checkcreate = await Account.findOne({ taxId: createNewUser.taxId });
    if (checkcreate) {
      throw new Error("User already exist, cannot create another");
    }
    const { name, taxId, password } = createNewUser;
    return await Account.create({ name, taxId, password });
  }

  @Mutation(() => typeAccount)
  async editUser(@Arg("editUser") editUser: typeAccountInput) {
    let editCheck = await Account.findOne({ editUser: editUser.taxId });
    if (editCheck) {
      const { name, taxId, password } = editUser;

      const update = { name, taxId, password } 

      return await Account.findOneAndUpdate({ taxId }, update, { new: true });
    }
    throw new Error(`User with CPF:${editUser.taxId} not found!!`);
  }

  @Mutation(() => String)
  async removeUser(@Arg("deleteUser") taxId: number) {
    let checkremove = await Account.findOne({ taxId: taxId });
    if (checkremove) {
      await Account.deleteOne({ taxId: taxId });
      return `User with CPF:${taxId} deleted`;
    }
    throw new Error(`User with CPF:${taxId} not found!!`);
  }
}
