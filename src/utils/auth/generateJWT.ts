import jwt from "jsonwebtoken";

function generateToken(userId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "1h",
  });
  return token;
}

export { generateToken };
