import jwt from "jsonwebtoken";

function verifyJWT(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const decoded = jwt.verify(token, secret);

  return decoded;
}

export { verifyJWT };
