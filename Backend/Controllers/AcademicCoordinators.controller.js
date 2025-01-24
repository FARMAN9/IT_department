import  AcademicCoordinatorsModel  from "../Models/AcademicCoordinatorsModel.js";


export const GetAllAcademicCoordinators = async (req, res) => {
    try {
        const AcademicCoordinators = await AcademicCoordinatorsModel.find({});
        res.status(200).json({data:AcademicCoordinators,
            message:"AcademicCoordinators Fetched Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const PostAcademicCoordinators = async (req, res) => {
    try {
        
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)
        const newAcademicCoordinators = await AcademicCoordinatorsModel.create({
           Coordinators: req.body.Coordinators,
           Programe: req.body.Programe
        });
        res.status(201).json({data:newAcademicCoordinators,
            message:"Academic Coordinator Created Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateAcademicCoordinator = async (req, res) => {
    try {
        const updatedAcademicCoordinator = await AcademicCoordinatorsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAcademicCoordinator) {
            return res.status(404).json({ error: "Academic Coordinator not found" });
        }
        res.status(200).json({data:updatedAcademicCoordinator,
            message:"Academic Coordinator Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteAcademicCoordinator = async (req, res) => {
    try {
        const deletedAcademicCoordinator = await AcademicCoordinatorsModel.findByIdAndDelete(req.params.id);
        if (!deletedAcademicCoordinator) {
            return res.status(404).json({ error: "Academic Coordinator not found" });
        }
        res.status(200).json({data:deletedAcademicCoordinator,
            message:"Academic Coordinator Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
