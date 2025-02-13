import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const secureRouter = async (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.cookie.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {   
        res.status(500).json({ error: "Internal Server Error" +error });
    }
};

export default secureRouter;