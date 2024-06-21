import 'reflect-metadata';
import { ByUserTaxIdResolver } from '../query/ByUserTaxIdResolver'; // Certifique-se de ajustar o caminho correto se necessário
import connectToMongoDB from "../../../database/conectionDatabase";
import mongoose from 'mongoose';
import User from "../../../database/schemas/userModel";

describe("ByUserTaxIdResolver", () => {
  let resolver: ByUserTaxIdResolver;

  beforeAll(async () => {
    await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {
    resolver = new ByUserTaxIdResolver();
  });

  it("should return a user when given a valid TaxId", async () => {

    const validTaxId = 123;

    const user = await resolver.ByUserTaxId(validTaxId);

    expect(user).toBeDefined();
    expect(user).toHaveProperty("taxId", validTaxId);

  });

  it("should throw an error when the TaxId is not found", async () => {
    const invalidTaxId = 0;

    await expect(resolver.ByUserTaxId(invalidTaxId)).rejects.toThrow("User Not Found!");
  });
});
