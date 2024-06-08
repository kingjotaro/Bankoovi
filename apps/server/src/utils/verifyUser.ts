import User from "../database/schemas/userModel";

import { typeUserInput } from "../graphqlTypes/typesUser";

async function verifyUser(newUser: typeUserInput) {
  let checkUserId = await User.findOne({ taxId: newUser.taxId });
  if (checkUserId) {
    throw new Error("A user with this ID already has a User");
  }
}

export { verifyUser };
