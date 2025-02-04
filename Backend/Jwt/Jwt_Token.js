import jwt from "jsonwebtoken";


const craeteTokenAndSave=(userId,role,res)=>{
    const token = jwt.sign({ userId,role }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600000,
      });

}

export default craeteTokenAndSave;

