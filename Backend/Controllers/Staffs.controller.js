import  StaffsModel  from "../Models/StaffsModel.js";
import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllStaffs = async (req, res) => {
    try {
        const Staffs = await StaffsModel.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        res.status(200).json({data:Staffs,
            message:"Staffs Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostStaffs = async (req, res) => {

    try {
        const { name, email, mobile } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Staffs is required" });
        }
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        if (!mobile) {
            return res.status(400).json({ error: "Mobile is required" });
        }

        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        const newStaffs = await StaffsModel.create({
           image: fileUrl,
           name: req.body.name,
           email: req.body.email,
           mobile: req.body.mobile,
        });
        res.status(201).json({data:newStaffs,
            message:"Staffs Created Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const UpdateStaffs = async (req, res) => {
    try {

        const updatedStaffs = await StaffsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            updatedStaffs.Staffs = fileUrl;
        }

        if (!updatedStaffs) {
            return res.status(404).json({ error: "Staffs not found" });
        }
        res.status(200).json({data:updatedStaffs,
            message:"Staffs Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteStaffs = async (req, res) => {
    try {
        const deletedStaffs = await StaffsModel.findByIdAndDelete(req.params.id);
        if (!deletedStaffs) {
            return res.status(404).json({ error: "Staffs not found" });
        }
        res.status(200).json({data:deletedStaffs,
            message:"Staffs Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
