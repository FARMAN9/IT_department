import UserModel from '../../Models/UserModel.js'
import {hashPassword,comparePassword} from "../../Utility/Utility.js";

import createTokenAndSave from "../../Jwt/Jwt_Token.js";
import { asFiletoCloud } from "../../Utility/Utility.js";


export const signUpForUsers = async (req, res) => {
    try {
        const { name, email, password, designation } = req.body;
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
            designation
        });
        if (req.file) {
            const {fileUrl,appwriteFile} = await asFiletoCloud(new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            }));
            NewUser.image = fileUrl;
            NewUser.id = appwriteFile.$id;
        }
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
        const { name, email, password, designation, mobile } = req.body;
        let UserImage = '';
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const { fileUrl, appwriteFile } = await asFiletoCloud(file);
            UserImage = fileUrl;
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
                image: UserImage,
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
                image: UserImage,
                designation,
                status: 'active',
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
        if (user.status === 'not verified') {
            return res.status(400).json({ message: "Please wait for admin approval" });
        }
        createTokenAndSave(user, res);
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                designation: user.designation,
                mobile: user.mobile,
                role: user.role,
                
            },
            message: "Login successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}



export const logout = async (req, res) => {
  try {
    res.clearCookie("Uid");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getFaculty = async (req, res) => {
    try {
        const users = await UserModel.find({ role: 'user' });
        res.status(200).json({
            success: true,
            data: users,
            message: "Faculty fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const getAdmin = async (req, res) => {
    try {
        const users = await UserModel.find({ role: 'Admin' });
        res.status(200).json({
            success: true,
            data: users,
            message: "Admin fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

