import "reflect-metadata";
import { ByObjectIdResolver } from "../query/UserByObjectIdResolver";
import { connect, closeDatabase, clearDatabase } from "./helpers/dbHandler";
import mongoose from "mongoose";
import User from "../../../database/schemas/userModel";

describe("ByObjectIdResolver", () => {
  let resolver: ByObjectIdResolver;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    resolver = new ByObjectIdResolver();
    await clearDatabase();
  });

  it("should return a user when given a valid ObjectId", async () => {
    const userData = {
      _id: new mongoose.Types.ObjectId("666807c21429ba22a65878e7"),
      name: "Test User",
      taxId: 123456789,
      password: "password123",
    };

    await User.create(userData);

    const user = await resolver.ByObjectId("666807c21429ba22a65878e7");

    expect(user).toHaveProperty("_id");
    expect(user._id.toString()).toBe("666807c21429ba22a65878e7");
  });

  it("should throw an error when the user is not found", async () => {
    const invalidObjectId = new mongoose.Types.ObjectId();

    await expect(
      resolver.ByObjectId(invalidObjectId.toString())
    ).rejects.toThrow("UserId not found");
  });
});
