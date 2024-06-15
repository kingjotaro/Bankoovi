import mongoose from "mongoose";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import {
  typeCreateTransaction,
  typeTransaction,
} from "../../graphqlTypes/typesTransaction";
import Transaction from "../../database/schemas/transactionModel";
import Account from "../../database/schemas/accountModel";
import { returnAccountData } from "../../utils/resolvers/returnAccountData";
import { authenticateJWT } from "../../midleware/authenticate"; 

@Resolver()
export class TransactionResolver {
  @Mutation(() => typeTransaction)
  @UseMiddleware(authenticateJWT) 
  async createTransaction(
    @Arg("createTransaction") createTransaction: typeCreateTransaction,
  ): Promise<typeTransaction> {
    const session = await mongoose.startSession();
    session.startTransaction();

    const senderAccount = await returnAccountData(createTransaction.senderAccount);
    const receiverAccount = await returnAccountData(createTransaction.receiverAccount);

    const senderID = senderAccount._id.toString();
    const receiverID = receiverAccount._id.toString();

    try {
      const transactionSender = new Transaction({
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
        origin: receiverID,
        senderAccount: senderAccount?.accountNumber,
        senderId: senderID,
        receiverAccount: receiverAccount?.accountNumber,
        receiverId: receiverID,
        amount: createTransaction.amount,
        createdAt: new Date(),
        type: "Credit",
      });

      if (!senderAccount) {
        throw new Error("Conta remetente não encontrada");
      }
      if (senderAccount.balance < transactionSender.amount) {
        throw new Error("Saldo insuficiente");
      }
      if (!receiverAccount) {
        throw new Error("Conta destinatária não encontrada");
      }

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
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
