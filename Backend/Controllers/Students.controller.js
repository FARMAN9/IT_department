import  StudentsModel  from "../Models/StudentsModel.js";
import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllStudents = async (req, res) => {
    try {
        const Students = await StudentsModel.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        res.status(200).json({data:Students,
            message:"Students Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostStudents = async (req, res) => {

    try {
        const { Programe, Batch } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Students is required" });
        }
        if (!Programe) {
            return res.status(400).json({ error: "Programme is required" });
        }

        if (!Batch) {
            return res.status(400).json({ error: "Batch is required" });
        }

        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        const newStudents = await StudentsModel.create({
           Students: fileUrl,
           Programe: req.body.Programe,
            Batch: req.body.Batch,
            
        
        });
        res.status(201).json({data:newStudents,
            message:"Students Created Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const UpdateStudents = async (req, res) => {
    try {

        const updatedStudents = await StudentsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            updatedStudents.Students = fileUrl;
        }

        if (!updatedStudents) {
            return res.status(404).json({ error: "Students not found" });
        }
        res.status(200).json({data:updatedStudents,
            message:"Students Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteStudents = async (req, res) => {
    try {
        const deletedStudents = await StudentsModel.findByIdAndDelete(req.params.id);
        if (!deletedStudents) {
            return res.status(404).json({ error: "Students not found" });
        }
        res.status(200).json({data:deletedStudents,
            message:"Students Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
