import User from "../../database/schemas/userModel";

async function verifyIfUserExist(findUser: number) {
  let checkUserId = await User.findOne({ taxId: findUser });
  return checkUserId ? true : false;
}

export { verifyIfUserExist };
