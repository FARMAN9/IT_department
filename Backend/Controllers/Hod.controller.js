import { Client, Storage, ID } from "appwrite";
import dotenv from "dotenv";
import HodInfo from "../Models/HodModel.js";

dotenv.config();

const PROJECT_ID = process.env.APPWRITE_PROJECT_ID; 
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
const ENDPOINT = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const API_KEY = process.env.APPWRITE_API_KEY;




const MainID= 'mainNITItsri'

export const puthodImage = async (req, res) => {
    try {
        const mainId = req.params.id || MainID; // Use the ID from params or default to MainID
        let Hod_Info = await HodInfo.findById(mainId);

        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        // Initialize Appwrite client
        const client = new Client()
            .setEndpoint(ENDPOINT)
            .setProject(PROJECT_ID);

        const storage = new Storage(client);
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });

        // Upload file to Appwrite storage
        const appwriteFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
        const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${appwriteFile.$id}/view?project=${PROJECT_ID}&mode=admin`;

        if (!Hod_Info) {
            // If MainInfo not found, create a new record
            Hod_Info = new HodInfo({
                _id: mainId, // Use the same ID
                image: fileUrl,
                id:appwriteFile.$id
            });
            await Hod_Info.save();

            return res.status(201).json({
                success: true,
                data: fileUrl,
                message: "Image uploaded and new record created successfully",
            });
        } else {
            // If MainInfo exists, update the image
            Hod_Info.image = fileUrl;
            Hod_Info.id = appwriteFile.$id;
            await Hod_Info.save();

            return res.status(200).json({
                success: true,
                data: fileUrl,
                message: "Image uploaded and record updated successfully",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const posthodInfo = async (req, res) => {
    try {
        const { name, description, address, mail, phoneNumber } = req.body;

        // Validate required fields
        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!description) return res.status(400).json({ error: "Description is required" });
        if (!address) return res.status(400).json({ error: "Address is required" });
        if (!mail) return res.status(400).json({ error: "Office mail is required" });
        if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

        // Check if a record with the same ID already exists
        let mainInfo = await HodInfo.findById(MainID);

        if (mainInfo) {
            // Update the existing record
            mainInfo.name = name;
            mainInfo.description = description;
            mainInfo.address = address;
            mainInfo.officeMail =mail;
            mainInfo.phoneNumber = phoneNumber;

            await mainInfo.save();

            return res.status(200).json({
                success: true,
                data: mainInfo,
                message: "HodInfo updated successfully",
            });
        } else {
            // Create a new record
            mainInfo = await HodInfo.create({
                _id: MainID,
                name,
                description,
                address,
                officeMail,
                phoneNumber,
            });

            return res.status(201).json({
                success: true,
                data: mainInfo,
                message: "HodInfo created successfully",
            });
        }
    } catch (error) {
        // Handle specific MongoDB validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: "Validation Error",
                details: error.message,
            });
        }

        // Handle other unexpected errors
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};




export const getHodInfo = async (req, res) => {
    try {
        // Find MainInfo by ID from the request parameters or default MainID
        const mainInfo = await HodInfo.findById(req.params.id || MainID);

        // If not found, return a 404 error
        if (!mainInfo) {
            return res.status(404).json({ error: "HodInfo not found" });
        }

        // Return the MainInfo object with a 200 status code
        res.status(200).json({
            success: true,
            data: mainInfo,
        });
    } catch (error) {
        // Return a 500 error for unexpected issues
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};
