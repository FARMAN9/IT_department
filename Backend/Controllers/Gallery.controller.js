import mongoose from "mongoose";
import GalleryModel from '../Models/GalleryModel.js';
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


export const PostGalleryImages = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }
        
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });

        const {fileUrl,appwriteFile} = await asFiletoCloud(file)
        const galleryImages = await GalleryModel.create({
            id: appwriteFile.$id,
            image: fileUrl, // Save the file URL
        });

        res.status(201).json(galleryImages);
    } catch (error) {
        console.error("Error uploading image:", error );
        res.status(500).json({ error: error.message });
    }
};



export const GetGalleryImages = async (req, res) => {
    try {
        const galleryImages = await GalleryModel.find({});
        res.status(200).json(galleryImages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const DeleteGalleryImages = async (req, res) => {
    try {
        try{
            const galleryImages = await GalleryModel.findByIdAndDelete(req.params.id);
        if (!galleryImages) {
            return res.status(404).json({ error: "Image not found" });
        }
       
            const client = new Client();
            client
                .setEndpoint(ENDPOINT)
                .setProject(PROJECT_ID);
            const storage = new Storage(client);
            const file = await storage.getFile(BUCKET_ID, galleryImages.id);
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
 