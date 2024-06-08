import { Mutation, Resolver, Arg } from "type-graphql";
import mongoose from "mongoose";
import { typeUserInput } from "../../../graphqlTypes/typesUser";
import { typeAccount, typeAccountInput } from "../../../graphqlTypes/typesAccount";
import { createUser } from "../../../utils/createUser"
import { createAccount } from "../../../utils/createAccount";
import { verifyUser } from "../../../utils/verifyUser";
import { verifyAccount } from "../../../utils/verifyAccount";
import { generateToken } from "../../../utils/generateJWT";

@Resolver()
export class CreateUserAndAccountResolver {
  @Mutation(() => typeAccount)
  async createUserAndAccount(
    @Arg("NewUser") newUser: typeUserInput,
    @Arg("NewAccount") newAccount: typeAccountInput
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await verifyUser(newUser)
      await verifyAccount(newAccount)
      
      const createdUser = await createUser(newUser, session);
      const createdAccount = await createAccount(newAccount, createdUser.id, session);

      const token = generateToken(createdUser.id);

      await session.commitTransaction();
      session.endSession();

      return { ...createdAccount.toObject(), token };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
