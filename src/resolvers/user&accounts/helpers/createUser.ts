import User from "../../../mongodb/schemas/userModel";
import bcrypt from "bcrypt";
import { typeUserInput } from "../../../graphqlTypes/typesUser";
import { ClientSession } from "mongoose";

async function createUser(newUser: typeUserInput, session: ClientSession) {
  const encriptPassword = await bcrypt.hash(newUser.password, 16);
  newUser.password = encriptPassword;

  const createdUser = await User.create([{ ...newUser }], { session });
  return createdUser[0];
}

export { createUser };
