import mongoose from "mongoose";
import { Arg, Mutation, Resolver } from "type-graphql";
import { typeCreateTransaction, typeTransaction } from "../../graphqlTypes/typesTransaction";
import Transaction from "../../database/schemas/transactionModel";
import Account from "../../database/schemas/accountModel";

@Resolver()
export class TransactionResolver {
  @Mutation(() => typeTransaction)
  async createTransaction(
    @Arg("createTransaction") createTransaction: typeCreateTransaction
  ): Promise<typeTransaction> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transactionSender = new Transaction({
        origin: createTransaction.senderAccount,
        senderAccount: createTransaction.senderAccount,
        receiverAccount: createTransaction.receiverAccount,
        amount: createTransaction.amount,
        createdAt: new Date(),
        type: "Debit"
      });

      const transactionReceiver = new Transaction({
        origin: createTransaction.receiverAccount,
        senderAccount: createTransaction.senderAccount,
        receiverAccount: createTransaction.receiverAccount,
        amount: createTransaction.amount,
        createdAt: new Date(),
        type: "Credit"
      });

      const savedTransactionSender = await transactionSender.save({ session });
      const savedTransactionReceiver = await transactionReceiver.save({ session });


      const senderAccount = await Account.findById(createTransaction.senderAccount).session(session);
      const receiverAccount = await Account.findById(createTransaction.receiverAccount).session(session);

      if (!senderAccount) {
        throw new Error("Conta remetente não encontrada");
      }
      if (senderAccount.balance < transactionSender.amount) {
        throw new Error("Saldo insuficiente");
      }
      if (!receiverAccount) {
        throw new Error("Conta destinatária não encontrada");
      }

      

      await Account.updateOne(
        { _id: createTransaction.senderAccount },
        { $inc: { balance: -transactionSender.amount } },
        { session }
      );

      await Account.updateOne(
        { _id: createTransaction.receiverAccount },
        { $inc: { balance: transactionSender.amount } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      
      return savedTransactionSender.toObject(), savedTransactionReceiver.toObject();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
