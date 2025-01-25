import  TimeTableModel  from "../Models/TimeTableModel.js";
import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllTimeTable = async (req, res) => {
    try {
        const TimeTable = await TimeTableModel.find({});
        res.status(200).json({data:TimeTable,
            message:"Time Table Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostTimeTable = async (req, res) => {

    try {
        
        console.log(req)

        if (!req.file) {
            return res.status(400).json({ error: "Time Table is required" });

        }
        const file = new File([req.file.buffer], req.file.originalname, {
            type: req.file.mimetype,
        });
        const {fileUrl,appwriteFile} = await asFiletoCloud(file)

        const newTimeTable = await TimeTableModel.create({
           TimeTable: fileUrl,
           Programe: req.body.Programe,
            Batch: req.body.Batch,
            Semester: req.body.Semester,
          
        });
        res.status(201).json({data:newTimeTable,
            message:"Time Table Created Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const UpdateTimeTable = async (req, res) => {
    try {
        const updatedTimeTable = await TimeTableModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTimeTable) {
            return res.status(404).json({ error: "Time Table not found" });
        }
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            updatedTimeTable.TimeTable = fileUrl;
        }
        res.status(200).json({data:updatedTimeTable,
            message:"Time Table Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteTimeTable = async (req, res) => {
    try {
        const deletedTimeTable = await TimeTableModel.findByIdAndDelete(req.params.id);
        if (!deletedTimeTable) {
            return res.status(404).json({ error: "Time Table not found" });
        }
        res.status(200).json({data:deletedTimeTable,
            message:"Time Table Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
