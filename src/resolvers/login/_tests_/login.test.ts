import "reflect-metadata";
import { LoginResolver } from "../LoginResolver";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  connect,
  closeDatabase,
  clearDatabase,
} from "../../../utils/tests/dbHandler";
import User from "../../../mongodb/schemas/userModel";
import { LoginResponse } from "../../../graphqlTypes/typesLogin";
import dotenv from "dotenv";

dotenv.config();

describe("LoginResolver", () => {
  let resolver: LoginResolver;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    resolver = new LoginResolver();
    await clearDatabase();
  });

  it("should return a token when given valid taxId and password", async () => {
    const password = "123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      _id: new mongoose.Types.ObjectId("666807c21429ba22a65878e7"),
      taxId: 1234,
      name: "rafael",
      password: hashedPassword,
    };

    await User.create(userData);

    const validTaxId = 1234;
    const validPassword = password;

    const response: LoginResponse = await resolver.login(
      validTaxId,
      validPassword
    );

    expect(response).toHaveProperty("token");

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decodedToken = jwt.verify(response.token, process.env.JWT_SECRET);

    expect(decodedToken).toHaveProperty("userId", userData._id.toString());
    expect(decodedToken).toHaveProperty("taxId", userData.taxId);
    expect((decodedToken as JwtPayload).taxId).toBe(validTaxId);
      
    
  });

it("should throw an error when the taxId is not found", async () => {
  const invalidTaxId = 0;
  const password = "password123";

  await expect(resolver.login(invalidTaxId, password)).rejects.toThrow(
    "There is no user with this taxId."
  );
});

it("should throw an error when the password is invalid", async () => {
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    _id: new mongoose.Types.ObjectId("666807c21429ba22a65878e7"),
    taxId: 123456789,
    name: "rafael",
    password: hashedPassword,
  };

  await User.create(userData);

  const validTaxId = 123456789;
  const invalidPassword = "wrongpassword";

  await expect(resolver.login(validTaxId, invalidPassword)).rejects.toThrow(
    "The password provided is invalid."
   );
  });
});