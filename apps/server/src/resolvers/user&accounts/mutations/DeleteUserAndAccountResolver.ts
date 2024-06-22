import { Mutation, Resolver, Arg } from "type-graphql";
import mongoose from "mongoose";
import { typeUser } from "../../../graphqlTypes/typesUser";
import { typeAccount } from "../../../graphqlTypes/typesAccount";
import { verifyIfUserExist } from "../../../utils/resolvers/verifyIfUserExist";
import { verifyIfAccountExist } from "../../../utils/resolvers/verifyIfAccountExist";
import { deleteUser } from "../helpers/deleteUser";
import { deleteAccount } from "../helpers/deleteAccount";

@Resolver()
export class DeleteUserAndAccountResolver {
  @Mutation(() => String)
  async deleteUserAndAccount(
    @Arg("User") User: typeUser,
    @Arg("Account") Account: typeAccount
  ): Promise<string> {
    const session = await mongoose.startSession();
    session.startTransaction();

    await verifyIfUserExist(User.taxId);
    await verifyIfAccountExist(Account.accountNumber);

    await deleteUser(User._id, session);
    await deleteAccount(Account._id, session);

    await session.commitTransaction();
    await session.endSession();

    return "User and Account successfully deleted.";
  }
}
