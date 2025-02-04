
import { Readable } from "stream";
import bcrypt from 'bcrypt';
 
import { Client, Storage, ID } from "appwrite";
import dotenv from "dotenv";

dotenv.config();

const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
const ENDPOINT = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const API_KEY = process.env.APPWRITE_API_KEY;

export async function asFiletoCloud(file) {
    const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);
    const storage = new Storage(client);
    const appwriteFile = await storage.createFile([BUCKET_ID], ID.unique(),file);
        
    
    console.log(appwriteFile)
    const fileUrl =`https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${appwriteFile.$id}/view?project=${PROJECT_ID}&project=${PROJECT_ID}&mode=admin`;
    return( {fileUrl,appwriteFile} )
}


export async function passwordHash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function passwordCompare(password, hash) {
    return await bcrypt.compare(password, hash);
}
