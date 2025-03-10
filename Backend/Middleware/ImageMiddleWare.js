import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const handleUpload = upload.single("image");

const uploadPDF = multer({ storage: multer.memoryStorage() });

export const handleUploadPDF = uploadPDF.single("pdf");

const uploadFile = multer({ storage: multer.memoryStorage() });

export const handleUploadFile = uploadFile.single("file");
