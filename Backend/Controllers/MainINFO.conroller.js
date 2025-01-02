

import MainInfo from "../Models/MainInfoModel.js";

import { Client, Storage, ID } from "appwrite";
import dotenv from "dotenv";

dotenv.config();

const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
const ENDPOINT = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const API_KEY = process.env.APPWRITE_API_KEY;

const MainID= 'mainNITsri'

export const  putImage = async (req, res) => {
    try {
        const mainInfo = await MainInfo.findById(req.params.id || MainID);
        if (!mainInfo) {
            return res.status(404).json({ error: "MainInfo not found" });
        }
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }
        const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);
        const storage = new Storage(client);
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const appwriteFile = await storage.createFile([BUCKET_ID], ID.unique(),file);
        const fileUrl =`https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${appwriteFile.$id}/view?project=${PROJECT_ID}&project=${PROJECT_ID}&mode=admin`;
        res.status(200).json({
            success: true,
            data: fileUrl,
            message: "Image uploaded successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
}
}

export const postMainInfo = async (req, res) => {
    try {

        if (!req.body.name) return res.status(400).json({ error: "name is required" });
        if (!req.body.description) return res.status(400).json({ error: "description is required" });
        if (!req.body.address) return res.status(400).json({ error: "address is required" });
        if (!req.body.officeMail) return res.status(400).json({ error: "officeMail is required" });
        if (!req.body.phoneNumber) return res.status(400).json({ error: "phoneNumber is required" });
       

       
     

        // Create the new record
        const mainInfo = await MainInfo.create({
            _id:MainID,
            name:req.body.name,
            description:req.body.description,
            address:req.body.address,
            officeMail:req.body.officeMail,
            phoneNumber:req.body.phoneNumber
        });

        // Return success response
        res.status(201).json({
            success: true,
            data: mainInfo,
            message: "MainInfo created successfully"
        });

    } catch (error) {
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: "Validation Error",
                details: error.message
            });
        }

        // Handle other errors
        res.status(500).json({ 
            error: "Internal Server Error",
            details: error.message 
        });
    }
};



export const getMainInfoById = async (req, res) => {
    try {
        const mainInfo = await MainInfo.findById(req.params.id||MainID);
        if (!mainInfo) {
            return res.status(404).json({ error: "MainInfo not found" });
        }
        console.log(mainInfo);
        res.status(200).json({
            image: mainInfo.image
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};