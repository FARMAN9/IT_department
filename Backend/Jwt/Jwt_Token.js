import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const createTokenAndSave = async (userId, role, res) => {
  if (!res) {
    console.error('Response object is undefined');
    return;
  }

  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET , {
    expiresIn: "8h",
  });
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3600000
  });
};

export default createTokenAndSave;

