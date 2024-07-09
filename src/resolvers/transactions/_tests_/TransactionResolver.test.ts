import "reflect-metadata";
import { TransactionResolver } from "../TransactionResolver";
import {
  connect,
  closeDatabase,
  clearDatabase,
} from "../../../utils/tests/dbHandler";
import mongoose from "mongoose";
import Account from "../../../mongodb/schemas/accountModel";
import Transaction from "../../../mongodb/schemas/transactionModel";
import { typeCreateTransaction } from "../../../graphqlTypes/typesTransaction";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import createKoaContext from '../../../utils/tests/koaHandler'

dotenv.config();



describe("TransactionResolver", () => {
  let resolver: TransactionResolver;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    resolver = new TransactionResolver();
    await clearDatabase();
  });

  it("should create a transaction successfully", async () => {
    const user1Id = new mongoose.Types.ObjectId("666807c21429ba22a65878e6");
    const user2Id = new mongoose.Types.ObjectId("666807c21429ba22a65878e7");

    const senderAccountData = {
      _id: new mongoose.Types.ObjectId(),
      accountNumber: 123456,
      balance: 1000,
      userId: user1Id
    };

    const receiverAccountData = {
      _id: new mongoose.Types.ObjectId(),
      accountNumber: 987654,
      balance: 500,
      userId: user2Id
    };

    await Account.create(senderAccountData);
    await Account.create(receiverAccountData);
    const context = createKoaContext(user1Id.toString());
    

    const transactionInput: typeCreateTransaction = {
      senderAccount: 123456,
      receiverAccount: 987654,
      amount: 1,
    };
    const result = await resolver.createTransaction(transactionInput, context);
    expect(result).toHaveProperty("transactionId");
    expect(result.senderAccount).toBe(123456);
    expect(result.receiverAccount).toBe(987654);

    const updatedSenderAccount = await Account.findById(senderAccountData._id);
    const updatedReceiverAccount = await Account.findById(receiverAccountData._id);

    expect(updatedSenderAccount).not.toBeNull();
    expect(updatedReceiverAccount).not.toBeNull();

    if (updatedSenderAccount && updatedReceiverAccount) {
      expect(updatedSenderAccount.balance).toBe(999);
      expect(updatedReceiverAccount.balance).toBe(501);
    }
  });

  it("should throw an error if sender account balance is insufficient", async () => {
    const user1Id = new mongoose.Types.ObjectId("666807c21429ba22a65878e8");
    const user2Id = new mongoose.Types.ObjectId("666807c21429ba22a65878e9");

    const senderAccountData = {
      _id: new mongoose.Types.ObjectId(),
      accountNumber: 123456,
      balance: 50,
      userId: user1Id
    };

    const receiverAccountData = {
      _id: new mongoose.Types.ObjectId(),
      accountNumber: 987654,
      balance: 500,
      userId: user2Id
    };

    await Account.create(senderAccountData);
    await Account.create(receiverAccountData);

    const transactionInput: typeCreateTransaction = {
      senderAccount: 123456,
      receiverAccount: 987654,
      amount: 100,
    };

    const context = createKoaContext(user1Id.toString());

    await expect(
      resolver.createTransaction(transactionInput, context)
    ).rejects.toThrow("Insufficient Balance!");

    console.log("Accounts after creation:", await Account.find());
  });

  it("should throw an error if user is not authorized", async () => {
    const user1Id = new mongoose.Types.ObjectId("666807c21429ba22a65878e6");
    const user2Id = new mongoose.Types.ObjectId("666807c21429ba22a65878e7");
    const anotherUserId = new mongoose.Types.ObjectId("666807c21429ba22a65878e8");

    const senderAccountData = {
      _id: new mongoose.Types.ObjectId(),
      accountNumber: 123456,
      balance: 1000,
      userId: user1Id
    };

    const receiverAccountData = {
      _id: new mongoose.Types.ObjectId(),
      accountNumber: 987654,
      balance: 500,
      userId: user2Id
    };

    await Account.create(senderAccountData);
    await Account.create(receiverAccountData);

    const transactionInput: typeCreateTransaction = {
      senderAccount: 123456,
      receiverAccount: 987654,
      amount: 100,
    };

    const context = createKoaContext("ctx to fail");

    await expect(
      resolver.createTransaction(transactionInput, context)
    ).rejects.toThrow("You are not authorized to perform this action.");

  });
});
