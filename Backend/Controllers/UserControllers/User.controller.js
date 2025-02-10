import UserModel from '../../Models/UserModel.js'
import {hashPassword,comparePassword} from "../../Utility/Utility.js";

import createTokenAndSave from "../../Jwt/Jwt_Token.js";
import { asFiletoCloud } from "../../Utility/Utility.js";


export const signUpForUsers = async (req, res) => {
    try {
        const { name, email, password, designation, mobile } = req.body;
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
            designation,
            mobile
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
        const token = await createTokenAndSave(user._id, user.role, res);
        

       

        
        return res.status(200).json({
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
