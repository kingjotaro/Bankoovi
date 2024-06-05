import { Mutation, Resolver, Arg } from "type-graphql";
import User from "../../../database/schemas/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Account from "../../../database/schemas/accountModel";
import { typeUserInput } from "../../../graphqlTypes/typesUser";
import {
  typeAccount,
  typeAccountInput,
} from "../../../graphqlTypes/typesAccount";
import dotenv from "dotenv";

dotenv.config();

@Resolver()
export class CreateUserAndAccountResolver {
  @Mutation(() => typeAccount)
  async createUserAndAccount(
    @Arg("NewUser") newUser: typeUserInput,
    @Arg("NewAccount") newAccount: typeAccountInput
  ) {
    let checkUserId = await User.findOne({ taxId: newUser.taxId });
    if (checkUserId) {
      throw new Error("A user with this ID already has a User");
    }

    const encriptPassword = await bcrypt.hash(newUser.password, 16);
    newUser.password = encriptPassword;

    const createdUser = await User.create({ ...newUser });

    let checkAccountUserId = await Account.findOne({ userId: createdUser.id });
    if (checkAccountUserId) {
      throw new Error("A user with this ID already has an account");
    }

    let checkAccountNumber = await Account.findOne({
      accountNumber: newAccount.accountNumber,
    });
    if (checkAccountNumber) {
      throw new Error("This account number is already taken");
    }

    const createdAccount = await Account.create({
      ...newAccount,
      userId: createdUser.id,
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ userId: createdUser.id }, secret, {
      expiresIn: "1h",
    });

    return { ...createdAccount.toObject(), token };
  }
}
