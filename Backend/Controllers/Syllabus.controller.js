import  SyllabusModel  from "../Models/SyllabusModel.js";
import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllSyllabus = async (req, res) => {
    try {
        const Syllabus = await SyllabusModel.find({});
        res.status(200).json({data:Syllabus,
            message:"Syllabus Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostSyllabus = async (req, res) => {

    try {
        
       

        if (!req.file) {
            return res.status(400).json({ error: "Syllabus is required" });

        }
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        const newSyllabus = await SyllabusModel.create({
           Syllabus: fileUrl,
           Programe: req.body.Programe,
           Batch: req.body.Batch,
           Coordinators: req.body.Coordinators
        });
        res.status(201).json({data:newSyllabus,
            message:"Syllabus Created Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const UpdateSyllabus = async (req, res) => {
    try {

        const updatedSyllabus = await SyllabusModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            updatedSyllabus.Syllabus = fileUrl;
        }

        if (!updatedSyllabus) {
            return res.status(404).json({ error: "Syllabus not found" });
        }
        res.status(200).json({data:updatedSyllabus,
            message:"Syllabus Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteSyllabus = async (req, res) => {
    try {
        const deletedSyllabus = await SyllabusModel.findByIdAndDelete(req.params.id);
        if (!deletedSyllabus) {
            return res.status(404).json({ error: "Syllabus not found" });
        }
        res.status(200).json({data:deletedSyllabus,
            message:"Syllabus Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
