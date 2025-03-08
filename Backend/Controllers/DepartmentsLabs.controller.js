import DepartmentsLabsModel from '../Models/DepartmentsLabsModel.js';

import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllDepartmentsLabs = async (req, res) => {
    try {
        const DepartmentsLabs = await DepartmentsLabsModel.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        res.status(200).json({data:DepartmentsLabs,
            message:"DepartmentsLabs Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostDepartmentsLabs = async (req, res) => {

    try {
        
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        const newDepartmentsLabs = await DepartmentsLabsModel.create({
           name: req.body.name,
           description: req.body.description,
            image: fileUrl,
           Incharge: req.body.Incharge
        });
        res.status(201).json({data:newDepartmentsLabs,
            message:"DepartmentsLabs Created Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const UpdateDepartmentsLabs = async (req, res) => {
    try {

        const updatedDepartmentsLabs = await DepartmentsLabsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            updatedDepartmentsLabs.image = fileUrl;
        }

        if (!updatedDepartmentsLabs) {
            return res.status(404).json({ error: "DepartmentsLabs not found" });
        }
        res.status(200).json({data:updatedDepartmentsLabs,
            message:"DepartmentsLabs Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteDepartmentsLabs = async (req, res) => {
    try {
        const deletedDepartmentsLabs = await DepartmentsLabsModel.findByIdAndDelete(req.params.id);
        if (!deletedDepartmentsLabs) {
            return res.status(404).json({ error: "DepartmentsLabs not found" });
        }

        res.status(200).json({data:deletedDepartmentsLabs,
            message:"DepartmentsLabs Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeDepartmentsLabsImage = async (req, res) => {
    try {
        const updatedDepartmentsLabs = await DepartmentsLabsModel.findByIdAndUpdate(
            req.params.id,
            { image: "" },
            { new: true }
        );
        if (!updatedDepartmentsLabs) {
            return res.status(404).json({ error: "DepartmentsLabs not found" });
        }
        res.status(200).json({
            data: updatedDepartmentsLabs,
            message: "Image removed successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const putLabManual = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "Lab manual is required" });
        }
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)
        const updatedLabManual = await DepartmentsLabsModel.findByIdAndUpdate(
            req.params.id,
            { lab_manual: fileUrl },
            { new: true }
        );
        if (!updatedLabManual) {
            return res.status(404).json({ error: "DepartmentsLabs not found" });
        }
        res.status(200).json({
            data: updatedLabManual,
            message: "Lab manual updated successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeLabManual = async (req, res) => {
    try {
        const updatedLabManual = await DepartmentsLabsModel.findByIdAndUpdate(
            req.params.id,
            { lab_manual: "" },
            { new: true }
        );
        if (!updatedLabManual) {
            return res.status(404).json({ error: "DepartmentsLabs not found" });
        }
        res.status(200).json({
            data: updatedLabManual,
            message: "Lab manual removed successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


