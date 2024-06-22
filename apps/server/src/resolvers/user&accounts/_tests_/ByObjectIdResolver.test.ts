import 'reflect-metadata';
import { ByObjectIdResolver } from '../query/UserByObjectIdResolver';
import connectToMongoDB from "../../../database/conectionDatabase";
import mongoose from 'mongoose';

describe("ByObjectIdResolver", () => {
  let resolver: ByObjectIdResolver;

  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {
    resolver = new ByObjectIdResolver();
  });

  it("should return a user when given a valid ObjectId", async () => {
    const validObjectId = "666807c21429ba22a65878e7";

    const user = await resolver.ByObjectId(validObjectId);

    expect(user).toHaveProperty("_id");
    expect(user._id.toString()).toBe(validObjectId);
  });

  it("should throw an error when the user is not found", async () => {
    const invalidObjectId = "yourInvalidObjectId";

    await expect(resolver.ByObjectId(invalidObjectId)).rejects.toThrow("Cast to ObjectId failed");
  });
});
