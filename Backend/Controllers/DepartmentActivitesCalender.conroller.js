import DepartmentActivitesCalenderModel from "../Models/DepartmentActivitesCalenderModel.js";
const MainID = 'DepartmentAC&CalenderNITsri'
import {asFiletoCloud} from "../Utility/Utility.js";




export const UplaodActivitesCalender = async (req, res) => {
    try {
        const activitesCalender = await DepartmentActivitesCalenderModel.findById(req.params.id || MainID);
        if (!activitesCalender) {
            if (!req.file) {
                return res.status(400).json({ error: "Activites Calender is required" });
            }
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const {fileUrl,appwriteFile} = await asFiletoCloud(file)
            const newActivitesCalender = await DepartmentActivitesCalenderModel.create({
                _id: MainID,
                Year: req.body.Year,
                Department: req.body.Department,
                ActivitesCalender: fileUrl
            })
            res.status(201).json({data:newActivitesCalender,
                message:"Activites Calender Created Successfully"
            });
        } else {
            if (req.file) {
                const file = new File([req.file.buffer], req.file.originalname, {
                    type: req.file.mimetype,
                });
                const {fileUrl,appwriteFile} = await asFiletoCloud(file)
                activitesCalender.ActivitesCalender = fileUrl;
            }
            const updatedActivitesCalender = await activitesCalender.save();
            res.status(200).json({data:updatedActivitesCalender,
                message:"Activites Calender Updated Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const GetActivitesCalender = async (req, res) => {
    try {
        // Find MainInfo by ID from the request parameters or default MainID
        const activitesCalender = await DepartmentActivitesCalenderModel.findById(req.params.id || MainID);

        // If not found, return a 404 error
        if (!activitesCalender) {
            return res.status(404).json({ error: "Activites Calender not found" });
        }

        // Return the MainInfo object with a 200 status code
        res.status(200).json({
            success: true,
            data: activitesCalender,
        });
    } catch (error) {
        // Return a 500 error for unexpected issues
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};