import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

function generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  };
  
export default function createKoaContext(userId: string) {
    const token = generateToken(userId);
    return {
      request: {
        header: {
          authorization: `${token}`,
        },
      },
      user: { userId },
    };
  };