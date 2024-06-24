import { Mutation, Resolver, Arg } from "type-graphql";
import mongoose from "mongoose";
import { verifyIfUserExist } from "../../../utils/resolvers/verifyIfUserExist";
import { verifyIfAccountExist } from "../../../utils/resolvers/verifyIfAccountExist";
import { deleteUser } from "../helpers/deleteUser";
import { deleteAccount } from "../helpers/deleteAccount";
import { typeDeleteAccount, typeDeleteUser } from "../../../graphqlTypes/typesDelete";

@Resolver()
export class DeleteUserAndAccountResolver {
  @Mutation(() => String)
  async deleteUserAndAccount(
    @Arg("User") User: typeDeleteUser,
    @Arg("Account") Account: typeDeleteAccount
  ): Promise<string> {
    const session = await mongoose.startSession();
    session.startTransaction();

    const userExists = await verifyIfUserExist(User.taxId);
    const accountExists = await verifyIfAccountExist(Account.accountNumber);
    
    if (!userExists && !accountExists) {
      throw new Error("User and Account do not exist.");
    }


    await deleteUser(User._id, session);
    await deleteAccount(Account._id, session);

    await session.commitTransaction();
    await session.endSession();

    return "User and Account successfully deleted.";
  }
}
