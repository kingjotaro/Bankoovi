import jwt from "jsonwebtoken";

function verifyJWT(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (err) {
    throw new Error("Token inválido/expirado");
  }
};

export { verifyJWT };