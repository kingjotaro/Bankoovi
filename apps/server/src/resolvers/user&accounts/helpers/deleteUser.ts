import User from "../../../database/schemas/userModel";
import { ClientSession } from "mongoose";

async function deleteUser(_id: string, session: ClientSession) {
  await User.deleteOne({ _id }, { session });
}

export { deleteUser };
