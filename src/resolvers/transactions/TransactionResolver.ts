import mongoose from "mongoose";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { typeCreateTransaction, typeTransaction } from "../../graphqlTypes/typesTransaction";
import Transaction from "../../mongodb/schemas/transactionModel";
import Account from "../../mongodb/schemas/accountModel";
import returnAccountData from "../../utils/resolvers/returnAccountData";
import { authenticateJWT } from "../../middleware/authenticate";
import getFormattedTimestamp from './helpers/getDate';

const MAX_RETRIES = 3;

@Resolver()
export class TransactionResolver {
  @Mutation(() => typeTransaction)
  @UseMiddleware(authenticateJWT)
  async createTransaction(
    @Arg("createTransaction") createTransaction: typeCreateTransaction,
    @Ctx() { user }: any
  ): Promise<typeTransaction> {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      const session = await mongoose.startSession();
      try {
        session.startTransaction();

        const senderAccount = await returnAccountData(createTransaction.senderAccount);
        if (!senderAccount) {
          throw new Error("Sender account error");
        }

        const receiverAccount = await returnAccountData(createTransaction.receiverAccount);
        if (!receiverAccount) {
          throw new Error("Receiver Account not found!");
        }

        const transactionIdCredit = getFormattedTimestamp() + "/" + `${receiverAccount.userId}/${createTransaction.amount}`;
        const transactionIdDebit = getFormattedTimestamp() + "/" + `${senderAccount.userId}/${createTransaction.amount}`;

        const transactionIdCredit64 = Buffer.from(transactionIdCredit).toString('base64');
        const transactionIdDebit64 = Buffer.from(transactionIdDebit).toString('base64');

        const existingTransactionCredit = await Transaction.findOne({ transactionId: transactionIdCredit64 }).session(session);
        if (existingTransactionCredit) {
          throw new Error("This transaction has already been processed Credit.");
        }

        const existingTransactionDebit = await Transaction.findOne({ transactionId: transactionIdDebit64 }).session(session);
        if (existingTransactionDebit) {
          throw new Error("This transaction has already been processed Debit.");
        }

        if (senderAccount.balance < createTransaction.amount) {
          throw new Error("Insufficient Balance!");
        }

        if (user.userId !== senderAccount?.userId.toString()) {
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

        await transactionSender.save({ session });
        await transactionReceiver.save({ session });

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
        return transactionSender.toObject();
      } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        if (error.message && error.message.includes("WriteConflict")) {
          console.warn(`Write conflict detected. Retry attempt ${attempt} of ${MAX_RETRIES}.`);
          if (attempt === MAX_RETRIES) {
            throw new Error("Maximum retry attempts reached. Please try again later.");
          }
        } else {
          throw error;
        }
      } finally {
        session.endSession();
      }
    }
    throw new Error("Transaction could not be completed after maximum retries.");
  }
}
