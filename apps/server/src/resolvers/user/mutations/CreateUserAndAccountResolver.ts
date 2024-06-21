import { Mutation, Resolver, Arg } from "type-graphql";
import mongoose from "mongoose";
import { typeUserInput } from "../../../graphqlTypes/typesUser";
import {
  typeAccount,
  typeAccountInput,
} from "../../../graphqlTypes/typesAccount";
import { createUser } from "../helpers/createUser";
import { createAccount } from "../helpers/createAccount";
import { verifyIfUserExist } from "../../../utils/resolvers/verifyIfUserExist";
import { verifyIfAccountExist } from "../../../utils/resolvers/verifyIfAccountExist";
import { generateToken } from "../../../utils/auth/generateJWT";

@Resolver()
export class CreateUserAndAccountResolver {
  @Mutation(() => typeAccount)
  async createUserAndAccount(
    @Arg("NewUser") newUser: typeUserInput,
    @Arg("NewAccount") newAccount: typeAccountInput
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    await verifyIfUserExist(newUser.taxId);
    await verifyIfAccountExist(newAccount.accountNumber);

    const createdUser = await createUser(newUser, session);
    const createdAccount = await createAccount(
      newAccount,
      createdUser.id,
      session
    );

    const token = generateToken(createdUser.id);

    await session.commitTransaction();
    session.endSession();

    return { ...createdAccount.toObject(), token };
  }
}
