import { Resolver, Mutation, Arg } from "type-graphql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../database/schemas/userModel";
import { LoginResponse } from "../../graphqlTypes/typesLogin";

class CustomError extends Error {
  constructor(public name: string, public message: string) {
    super(message);
    this.name = name;
  }
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("taxId") taxId: number,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ taxId });

    if (!user) {
      throw new CustomError("UserNotFound", "There is no user with this taxId.");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new CustomError("InvalidPassword", "The password provided is invalid.");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: user.id, taxId: user.taxId }, secret, {
      expiresIn: "1h",
    });

    return { token };
  }
}
