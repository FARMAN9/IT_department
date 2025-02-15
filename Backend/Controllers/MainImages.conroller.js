import mongoose from "mongoose";
import MainImages from '../Models/MainImagesModel.js';
import {asFiletoCloud} from "../Utility/Utility.js";

import { Readable } from "stream";
 // Adjust the import path as needed

 import { Client, Storage, ID } from "appwrite";
import dotenv from "dotenv";


dotenv.config();

const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
const ENDPOINT = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const API_KEY = process.env.APPWRITE_API_KEY;


export const PostMainImages = async (req, res) => {
    try {
        console.log(req)
        // Check if file exists
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

        // Upload the file to Appwrite storage
        const appwriteFile = await storage.createFile([BUCKET_ID], ID.unique(),file);
        
        // Generate the file's URL
        console.log(appwriteFile)
        const fileUrl =`https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${appwriteFile.$id}/view?project=${PROJECT_ID}&project=${PROJECT_ID}&mode=admin`;
        /*
        https://cloud.appwrite.io/v1/storage/buckets/677505210032f70ce531/files/67754b2000207831cb56/view?project=677504d9000800330b4e&project=677504d9000800330b4e&mode=admin

        */
        // Save file details to the database
        const mainImages = await MainImages.create({
            id: appwriteFile.$id,
            image: fileUrl, // Save the file URL
        });

        res.status(201).json({
            data: mainImages,
            message: "Image uploaded successfully",
        });
    } catch (error) {
        console.error("Error uploading image:", error );
        res.status(500).json({ message: error.message });
    }
};



export const GetMainImages = async (req, res) => {
    try {
        const mainImages = await MainImages.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        
        res.status(200).json(mainImages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const DeleteMainImages = async (req, res) => {
    try {
        try{
            const mainImages = await MainImages.findByIdAndDelete(req.params.id);
        if (!mainImages) {
            return res.status(404).json({ error: "Image not found" });
        }
       
            const client = new Client();
            client
                .setEndpoint(ENDPOINT)
                .setProject(PROJECT_ID);
            const storage = new Storage(client);
            const file = await storage.getFile(BUCKET_ID, mainImages.id);
            await storage.deleteFile(BUCKET_ID, file.$id);
            res.status(200).json({ message: "Image deleted successfully" });

        }
        catch(error){
            console.log(error)
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateMainImages = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });

        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        // Update the image document in the database
        const mainImages = await MainImages.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    id: appwriteFile.$id,
                    image: fileUrl, // Save the file URL
                },
            },
            { new: true, runValidators: true }
        );

        // Check if document was found and updated
        if (!mainImages) {
            return res.status(404).json({ error: "Image not found" });
        }

        res.status(200).json(mainImages);
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: error.message });
    }
};

 