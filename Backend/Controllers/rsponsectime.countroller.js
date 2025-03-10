import { asFiletoCloud } from "../Utility/Utility.js";
export const Postfile = async (req, res) => {
  const startTime = process.hrtime.bigint();

  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    const file = new File([req.file.buffer], req.file.originalname, {
      type: req.file.mimetype,
    });

    const { fileUrl, appwriteFile } = await asFiletoCloud(file);

    const endTime = process.hrtime.bigint();
    const responseTime = Number(endTime - startTime) / 1000; // Convert after subtraction

    return res.status(201).json({
      data: { fileUrl, appwriteFile },
      message: "File uploaded successfully",
      responseTime: `${responseTime.toFixed(2)}ms`,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PostfileGB = async (req, res) => {
  const startTime = process.hrtime.bigint();

  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Get file size in bytes
    const fileSizeBytes = req.file.buffer.length;

    // Configuration (you can move these to environment variables)
    const BANDWIDTH_MBPS = 100; // Simulated 100 Mbps bandwidth
    const MBPS_TO_BYTES_PER_MS = 12500; // Conversion factor (1 Mbps = 12500 bytes/ms)

    // Calculate latency
    const calculatedLatency =
      fileSizeBytes / (BANDWIDTH_MBPS * MBPS_TO_BYTES_PER_MS);

    // Existing file handling code
    const uploadDir = path.join(__dirname, "../../uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const sanitizedFilename = req.file.originalname.replace(
      /[^a-zA-Z0-9_.-]/g,
      "_"
    );
    const filename = `${timestamp}-${sanitizedFilename}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, req.file.buffer);

    const protocol = req.protocol;
    const host = req.get("host");
    const fileUrl = `${protocol}://${host}/uploads/${filename}`;

    const endTime = process.hrtime.bigint();
    const responseTime = Number(endTime - startTime) / 1000;

    return res.status(201).json({
      data: {
        fileUrl,
        localPath: filePath,
        filename: filename,
        fileSize: `${(fileSizeBytes / 1024 / 1024).toFixed(2)} MB`,
        calculatedLatency: `${calculatedLatency.toFixed(2)}ms`,
        assumedBandwidth: `${BANDWIDTH_MBPS} Mbps`,
      },
      message: "File uploaded successfully",
      responseTime: `${responseTime.toFixed(2)}ms`,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};
// Controllers/rsponsectime.countroller.js
export const PostfileGB2 = async (req, res) => {
  const startTime = process.hrtime.bigint();

  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Capture upload completion time
    const uploadEndTime = process.hrtime.bigint();

    // Calculate network transfer time (nanoseconds)
    const uploadDurationNS = Number(uploadEndTime - req.uploadStartTime);

    // Convert to milliseconds and seconds
    const uploadDurationMS = uploadDurationNS / 1e6;
    const uploadDurationSec = uploadDurationMS / 1000;

    // Calculate real bandwidth
    const fileSizeBytes = req.file.buffer.length;
    const fileSizeBits = fileSizeBytes * 8;
    const bandwidthMbps = fileSizeBits / uploadDurationSec / 1e6;

    // File handling
    const uploadDir = path.join(__dirname, "../../uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const sanitizedFilename = req.file.originalname.replace(
      /[^a-zA-Z0-9_.-]/g,
      "_"
    );
    const filename = `${timestamp}-${sanitizedFilename}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, req.file.buffer);

    // Generate URL
    const protocol = req.protocol;
    const host = req.get("host");
    const fileUrl = `${protocol}://${host}/uploads/${filename}`;

    // Total processing time
    const totalEndTime = process.hrtime.bigint();
    const totalResponseTime = Number(totalEndTime - startTime) / 1e6;

    return res.status(201).json({
      data: {
        fileUrl,
        fileSize: `${(fileSizeBytes / 1024 / 1024).toFixed(2)} MB`,
        uploadDuration: `${uploadDurationMS.toFixed(2)}ms`,
        measuredBandwidth: `${bandwidthMbps.toFixed(2)} Mbps`,
        serverProcessingTime: `${(totalResponseTime - uploadDurationMS).toFixed(
          2
        )}ms`,
        totalResponseTime: `${totalResponseTime.toFixed(2)}ms`,
      },
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message || "Server Error" });
  }
};
