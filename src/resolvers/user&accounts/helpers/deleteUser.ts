import User from "../../../mongodb/schemas/userModel";
import { ClientSession } from "mongoose";

async function deleteUser(_id: string, session: ClientSession) {
  const result = await User.deleteOne({ _id }, { session });

  if (result.deletedCount === 0) {
    throw new Error("Failed to delete User. The User may not exist or invalid ObjectID.");
  }
}

export { deleteUser };
