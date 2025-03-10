import {asFiletoCloud} from "../Utility/Utility.js";
export const Postfile = async (req, res) => {

    const startTime = process.hrtime.bigint();  

    try {
        
        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        }
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });

        const { fileUrl, appwriteFile } = await asFiletoCloud(file)
        
        const endTime = process.hrtime.bigint();
        const responseTime = Number(endTime - startTime) / 1000; // Convert after subtraction

        return res.status(201).json({
            data: { fileUrl, appwriteFile },
            message: "File uploaded successfully",
            responseTime: `${responseTime.toFixed(2)}ms`
        });
    } catch (error) {
        console.error("File upload error:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};



