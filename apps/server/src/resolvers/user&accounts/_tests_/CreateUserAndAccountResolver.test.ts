import "reflect-metadata";
import mongoose from 'mongoose';
import { connect, closeDatabase, clearDatabase } from "../../../utils/tests/dbHandler";
import { CreateUserAndAccountResolver } from "../mutations/CreateUserAndAccountResolver";
import { typeUserInput } from "../../../graphqlTypes/typesUser";
import { typeAccountInput } from "../../../graphqlTypes/typesAccount";
import dotenv from "dotenv";

dotenv.config();

describe("CreateUserAndAccountResolver", () => {
  let resolver: CreateUserAndAccountResolver;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    resolver = new CreateUserAndAccountResolver();
    await clearDatabase();
  });

  it("should create a new user and account", async () => {
    const newUser: typeUserInput = {
      taxId: 123456789,
      name: "Test User",
      password: "testpassword",
    };

    const newAccount: typeAccountInput = {
      accountNumber: 123456789,
      balance: 1000,
    };

    const result = await resolver.createUserAndAccount(newUser, newAccount);

    expect(result).toHaveProperty("accountNumber", newAccount.accountNumber);
    expect(result).toHaveProperty("balance", newAccount.balance);
    expect(result).toHaveProperty("token");
  }, 10000); 

  it("should throw an error if user or account already exists", async () => {
    const existingUser: typeUserInput = {
      taxId: 123456789,
      name: "Existing User",
      password: "existingpassword",
    };

    const existingAccount: typeAccountInput = {
      accountNumber: 123456789,
      balance: 500,
    };

    await resolver.createUserAndAccount(existingUser, existingAccount);

    await expect(
      resolver.createUserAndAccount(existingUser, existingAccount)
    ).rejects.toThrow();
  }, 10000);
});
