import  PhdscholarsModel  from "../Models/PhdscholarsModel.js";
import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllPhdscholars = async (req, res) => {
    try {
        const Phdscholars = await PhdscholarsModel.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        res.status(200).json({data:Phdscholars,
            message:"Phdscholars Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostPhdscholars = async (req, res) => {

    try {
        const { name, email, mobile } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "image is required" });
        }
        if (!name) {
            return res.status(400).json({ error: " is required" });
        }
        

        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        const   newPhdscholars = await PhdscholarsModel.create({
           image: fileUrl,
           name: req.body.name,
           email: req.body.email,
            mobile: req.body.mobile,
            linkedin: req.body.linkedin,
            googleScholars: req.body.googleScholars,
            researchGate :req.body.researchGate,
            personallink: req.body.personallink,
            others: req.body.others
           
        });
        res.status(201).json({data:newPhdscholars,
            message:"Phdscholars Created Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const UpdatePhdscholars = async (req, res) => {
    try {

        const updatedPhdscholars = await PhdscholarsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            updatedPhdscholars.image = fileUrl;
        }

        if (!updatedPhdscholars) {
            return res.status(404).json({ error: "Phdscholars not found" });
        }
        res.status(200).json({data:updatedPhdscholars,
            message:"Phdscholars Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeletePhdscholars = async (req, res) => {
    try {
        const deletedPhdscholars = await PhdscholarsModel.findByIdAndDelete(req.params.id);
        if (!deletedPhdscholars) {
            return res.status(404).json({ error: "Phdscholars not found" });
        }
        res.status(200).json({data:deletedPhdscholars,
            message:"Phdscholars Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
