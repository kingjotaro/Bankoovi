import mongoose from "mongoose";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import {
  typeCreateTransaction,
  typeTransaction,
} from "../../graphqlTypes/typesTransaction";
import Transaction from "../../mongodb/schemas/transactionModel";
import Account from "../../mongodb/schemas/accountModel";
import returnAccountData from "../../utils/resolvers/returnAccountData";
import { authenticateJWT } from "../../middleware/authenticate";
import getFormattedTimestamp from './helpers/getDate'


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

   
       Buffer.from("a").toString('base64');
   
   

    const transactionIdCredit = getFormattedTimestamp()+"/"+`${receiverAccount.userId}/${createTransaction.amount}`;
    const transactionIdDebit = getFormattedTimestamp()+"/"+`${senderAccount.userId}/${createTransaction.amount}`;

    console.log(transactionIdCredit)

    const transactionIdCredit64 =  Buffer.from(transactionIdCredit).toString('base64');
    const transactionIdDebit64 =  Buffer.from(transactionIdDebit).toString('base64');
  
    console.log(transactionIdCredit64)

    const existingTransactionCredit = await Transaction.findOne({ transactionId: transactionIdCredit64 });
    if (existingTransactionCredit) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("This transaction has already been processed Credit.");
    }

    const existingTransactionDebit = await Transaction.findOne({ transactionId: transactionIdDebit64 });
    if (existingTransactionDebit) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("This transaction has already been processed Debit.");
    }

  

    if (senderAccount.balance < createTransaction.amount) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Insufficient Balance!");
    }


    if (user.userId !== senderAccount?.userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("You are not authorized to perform this action.");
    }

    const senderID = senderAccount._id.toString();
    const receiverID = receiverAccount._id.toString();

    const transactionSender = new Transaction({
      transactionId: transactionIdDebit64,
      origin: senderID,
      senderAccount: senderAccount?.accountNumber,
      senderId: senderID,
      receiverAccount: receiverAccount?.accountNumber,
      receiverId: receiverID,
      amount: createTransaction.amount,
      type: "Debit",
    });

    const transactionReceiver = new Transaction({
      transactionId: transactionIdCredit64,
      origin: receiverID,
      senderAccount: senderAccount?.accountNumber,
      senderId: senderID,
      receiverAccount: receiverAccount?.accountNumber,
      receiverId: receiverID,
      amount: createTransaction.amount,
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