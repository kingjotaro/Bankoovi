import User from "../../database/schemas/userModel";

async function verifyIfUserExist(findUser: number) {
  const checkUserId = await User.findOne({ taxId: findUser });
  return checkUserId ? true : false;
}

export { verifyIfUserExist };
