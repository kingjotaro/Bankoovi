import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined");
}

export const authenticateJWT = async ({ context }: any, next: () => any) => {
  const token = context.req.headers.authorization;
  
  if (!token) {
    throw new Error("Need JWT token");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    context.user = decoded;
  } catch (err) {
    throw new Error("Invalid JWT token");
  }

  return next();
};


export default authenticateJWT;
