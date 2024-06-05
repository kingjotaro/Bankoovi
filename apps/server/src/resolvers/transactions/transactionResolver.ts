import { Mutation, Query, Resolver, Arg } from "type-graphql";
import Transaction from "../../database/schemas/transactionModel";
import {
  typeTransaction,
  typeCreateTransaction,
} from "../../graphqlTypes/typesTransaction";

@Resolver()
export class TransactionResolver {
  @Query(() => typeTransaction)
  async ByTransaction_ID(
    @Arg("Transaction_ID") Transactiontransaction_ID: string
  ) {
    let checkquery = await Transaction.findOne({
      Transactiontransaction_ID: Transactiontransaction_ID,
    });
    if (checkquery) {
      return checkquery;
    } else throw new Error("transaction_ID not found");
  }

  @Query(() => typeTransaction)
  async BySenderAccount(@Arg("senderAccount") senderAccount: string) {
    let checkquery = await Transaction.findOne({
      senderAccount: senderAccount,
    });
    if (checkquery) {
      return checkquery;
    } else throw new Error("senderAccount not found");
  }

  @Query(() => typeTransaction)
  async ByReceiverAccount(@Arg("receiverAccount") receiverAccount: string) {
    let checkquery = await Transaction.findOne({
      receiverAccount: receiverAccount,
    });
    if (checkquery) {
      return checkquery;
    } else throw new Error("receiverAccount not found");
  }

  @Mutation(() => typeTransaction)
  async NewTransaction(
    @Arg("NewTransaction") newTransaction: typeCreateTransaction
  ) {
    let checkTransactionId = await Transaction.findOne({
      transaction_ID: newTransaction.transaction_ID,
    });
    if (checkTransactionId) {
      throw new Error("A Transaction with this ID already has an done");
    }
    const createdTransaction = await Transaction.create({ ...newTransaction });
    return createdTransaction;
  }
}
