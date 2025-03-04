import  ResearchAreasModel  from "../Models/ResearchAreasModel.js";
import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllResearchAreas = async (req, res) => {
    try {
        const ResearchAreas = await ResearchAreasModel.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        res.status(200).json({data:ResearchAreas,
            message:"ResearchAreas Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostResearchAreas = async (req, res) => {

    try {
        
        if (!req.file) {
            return res.status(400).json({ error: "ResearchAreas is required" });
        }
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        const newResearchAreas = await ResearchAreasModel.create({
           name: req.body.name,
           description: req.body.description,
           image: fileUrl,
           location: req.body.location
        });
        res.status(201).json({data:newResearchAreas,
            message:"ResearchAreas Created Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const UpdateResearchAreas = async (req, res) => {
    try {

        const updatedResearchAreas = await ResearchAreasModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            updatedResearchAreas.image = fileUrl;
        }

        if (!updatedResearchAreas) {
            return res.status(404).json({ error: "ResearchAreas not found" });
        }
        res.status(200).json({data:updatedResearchAreas,
            message:"ResearchAreas Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteResearchArea = async (req, res) => {
    try {
        const deletedResearchAreas = await ResearchAreasModel.findByIdAndDelete(req.params.id);
        if (!deletedResearchAreas) {
            return res.status(404).json({ error: "ResearchAreas not found" });
        }
        res.status(200).json({data:deletedResearchAreas,
            message:"ResearchAreas Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
