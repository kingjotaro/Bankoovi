import Account from "../../../mongodb/schemas/accountModel";
import { ClientSession } from "mongoose";

async function deleteAccount(_id: string, session: ClientSession) {

    const result = await Account.deleteOne({ _id }, { session });
    
    if (result.deletedCount === 0) {
      throw new Error("Failed to delete account. The account may not exist or invalid ObjectID.");
    }
  } 

export { deleteAccount };
