import "reflect-metadata";
import { AccountByAccountNumberResolver } from "../query/AccountByAccountNumberResolver";
import mongoose from "mongoose";
import { connect, closeDatabase, clearDatabase } from "./helpers/dbHandler";
import Account from "../../../database/schemas/accountModel";

describe("AccountByAccountNumberResolver", () => {
  let resolver: AccountByAccountNumberResolver;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    resolver = new AccountByAccountNumberResolver();
    await clearDatabase();
  });

  it("should return an account when given a valid account number", async () => {
    const accountData = {
      _id: new mongoose.Types.ObjectId("666807c21429ba22a65878e7"),
      accountNumber: 987654321,
      userId: new mongoose.Types.ObjectId("666807c21429ba22a65878e8"),
      balance: 1000,
    };

    await Account.create(accountData);

    const validAccountNumber = 987654321;

    const account = await resolver.AccountByAccountNumber(validAccountNumber);

    expect(account).toHaveProperty("accountNumber", validAccountNumber);
    expect(account.accountNumber).toBe(987654321);
  });

  it("should throw an error when the account number is not found", async () => {
    const invalidAccountNumber = 0;

    await expect(resolver.AccountByAccountNumber(invalidAccountNumber)).rejects.toThrow(
      "Account Not Found!"
    );
  });
});
