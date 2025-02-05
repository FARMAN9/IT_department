import UserModel from '../../Models/UserModel.js'
import {hashPassword,comparePassword} from "../../Utility/Utility.js";

import craeteTokenAndSave from "../../Jwt/Jwt_Token.js";
import { asFiletoCloud } from "../../Utility/Utility.js";


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



export const signUpForAdmin = async (req, res) => {
    try {
        const { name, email, password, image, designation, mobile } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!designation) {
            return res.status(400).json({ message: "Designation is required" });
        }
        
        if (req.file) {
             const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
             });
            
                      
            
        }
        

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Admin already exists" });

        }
        const hashedPassword = await hashPassword(password);

        const FoundAdmin = await UserModel.countDocuments({ role: 'Admin' });

        if (FoundAdmin >= 1) {
            const NewUser = new UserModel({
                name,
                email,
                password: hashedPassword,
                role: 'Admin',
                image,
                designation,
                status: 'not verified',
                mobile
            });
            await NewUser.save();
        
            return res.status(201).json({
                success: true,
                data: NewUser,
                message: "Admin created successfully wait for approval",
            });
        }
        else {
            const NewUser = new UserModel({
                name,
                email,
                password: hashedPassword,
                role: 'Admin',
                image,
                designation,
                status:'active',
                mobile
            });
            await NewUser.save();
        
            return res.status(201).json({
                success: true,
                data: NewUser,
                message: "Admin created successfully",
            });
        }
            
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
