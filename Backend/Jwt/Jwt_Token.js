import jwt from "jsonwebtoken";



const createTokenAndSave = async (User, res) => {
  if (!res) {
    console.error('Response object is undefined');
    return;
  }

  const token = jwt.sign({ userId: User._id, role: User.role }, process.env.JWT_SECRET , {
    expiresIn: "8h",
  });
  
 res.cookie("Uid", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Secure in production only
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjust based on environment
  maxAge: 3600000
});
};

export default createTokenAndSave;

