import mongoose from "mongoose";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import {
  typeCreateTransaction,
  typeTransaction,
} from "../../graphqlTypes/typesTransaction";
import Transaction from "../../database/schemas/transactionModel";
import Account from "../../database/schemas/accountModel";
import { returnAccountData } from "../../utils/resolvers/returnAccountData";
import { authenticateJWT } from "../../midleware/authenticate";
import { v4 as uuidv4 } from "uuid";




@Resolver()
export class TransactionResolver {
  @Mutation(() => typeTransaction)
  @UseMiddleware(authenticateJWT)
  async createTransaction(
    @Arg("createTransaction") createTransaction: typeCreateTransaction,
    @Ctx() { user }: any 
  ): Promise<typeTransaction> {




    const session = await mongoose.startSession();
    session.startTransaction();

    const transactionId = uuidv4();

    const existingTransaction = await Transaction.findOne({ transactionId }).session(session);
    if (existingTransaction) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("This transaction has already been processed.");
    }

    const senderAccount = await returnAccountData(createTransaction.senderAccount);
    if (!senderAccount) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Sender account error");
    }

    const receiverAccount = await returnAccountData(createTransaction.receiverAccount);
    if (!receiverAccount) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Receiver Account not found!");
    }

    if (senderAccount.balance < createTransaction.amount) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Insufficiente Balance!");
    }

    
    if (user.userId !== senderAccount?.userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("You are not authorized to perform this action.");
    }

    const senderID = senderAccount._id.toString();
    const receiverID = receiverAccount._id.toString();

    const transactionSender = new Transaction({
      transactionId,
      origin: senderID,
      senderAccount: senderAccount?.accountNumber,
      senderId: senderID,
      receiverAccount: receiverAccount?.accountNumber,
      receiverId: receiverID,
      amount: createTransaction.amount,
      createdAt: new Date(),
      type: "Debit",
    });

    const transactionReceiver = new Transaction({
      transactionId,
      origin: receiverID,
      senderAccount: senderAccount?.accountNumber,
      senderId: senderID,
      receiverAccount: receiverAccount?.accountNumber,
      receiverId: receiverID,
      amount: createTransaction.amount,
      createdAt: new Date(),
      type: "Credit",
    });

  

    const savedTransactionSender = await transactionSender.save({ session });
    const savedTransactionReceiver = await transactionReceiver.save({ session });

    await Account.updateOne(
      { _id: senderID },
      { $inc: { balance: -transactionSender.amount } },
      { session }
    );

    await Account.updateOne(
      { _id: receiverID },
      { $inc: { balance: transactionSender.amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return savedTransactionSender.toObject();
  }
}
