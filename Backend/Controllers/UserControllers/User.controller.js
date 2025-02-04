import UserModel from "../Models/UserModel.js";
import { hashPassword, comparePassword } from "../../Utility/Utility.js";

import craeteTokenAndSave from "../../Jwt/Jwt_Token.js";




export const signUpForUsers = async (req, res) => {
    try {
        const { name, email, password, image, designation, mobile } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });

        }
        const hashedPassword = await hashPassword(password);
        const NewUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role:'user',
            image,
            designation,
            mobile
        });
        await NewUser.save();
        
        return res.status(201).json({
                success: true,
                data: NewUser,
                message: "User created successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = await craeteTokenAndSave(user._id, user.role);
        return res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                designation: user.designation,
                mobile: user.mobile,
                role: user.role
            },
            token: token,
            message: "Login successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}
