import "reflect-metadata";
import { ByUserTaxIdResolver } from "../query/UserByUserTaxIdResolver";
import mongoose from "mongoose";
import { connect, closeDatabase, clearDatabase } from "./helpers/dbHandler";
import User from "../../../database/schemas/userModel";

describe("ByUserTaxIdResolver", () => {
  let resolver: ByUserTaxIdResolver;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    resolver = new ByUserTaxIdResolver();
    await clearDatabase();
  });

  it("should return a user when given a valid TaxId", async () => {
    const userData = {
      _id: new mongoose.Types.ObjectId("666807c21429ba22a65878e7"),
      name: "Test User",
      taxId: 123456789,
      password: "password123",
    };

    await User.create(userData);

    const validTaxId = 123456789;

    const user = await resolver.ByUserTaxId(validTaxId);

    expect(user).toHaveProperty("taxId", validTaxId);
    expect(user._id.toString()).toBe("666807c21429ba22a65878e7");
  });

  it("should throw an error when the TaxId is not found", async () => {
    const invalidTaxId = 0;

    await expect(resolver.ByUserTaxId(invalidTaxId)).rejects.toThrow(
      "User Not Found!"
    );
  });
});
