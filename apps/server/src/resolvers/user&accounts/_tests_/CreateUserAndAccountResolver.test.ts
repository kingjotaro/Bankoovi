import "reflect-metadata";
import mongoose from 'mongoose';
import connectToMongoDB from "../../../database/conectionDatabase";
import { CreateUserAndAccountResolver } from "../mutations/CreateUserAndAccountResolver";
import { createUser } from "../helpers/createUser";
import { createAccount } from "../helpers/createAccount";
import { verifyIfUserExist } from "../../../utils/resolvers/verifyIfUserExist";
import { verifyIfAccountExist } from "../../../utils/resolvers/verifyIfAccountExist";
import { generateToken } from "../../../utils/auth/generateJWT";
import { typeUserInput } from "../../../graphqlTypes/typesUser";
import { typeAccountInput } from "../../../graphqlTypes/typesAccount";

describe("CreateUserAndAccountResolver", () => {
  let resolver: CreateUserAndAccountResolver;

  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    resolver = new CreateUserAndAccountResolver();
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
  });

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

    await expect(
      resolver.createUserAndAccount(existingUser, existingAccount)
    ).rejects.toThrow();
  });
});
