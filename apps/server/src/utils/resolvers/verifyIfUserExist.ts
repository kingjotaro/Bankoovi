import User from "../../database/schemas/userModel";


async function verifyIfUserExist(findUser: number) {
  let checkUserId = await User.findOne({ taxId: findUser });
  if (checkUserId) {
    throw new Error("A user with this ID already has a User");
  }
  return false
}

export { verifyIfUserExist };
