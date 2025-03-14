import  ActivitiesAndStudentsNotificationsModel  from "../Models/ActivitiesAndStudentsNotificationsModel.js";
import { asFiletoCloud } from "../Utility/Utility.js";

export const GetAllActivitiesAndStudentsNotifications = async (req, res) => {
    try {
        const ActivitiesAndStudentsNotifications = await ActivitiesAndStudentsNotificationsModel.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        res.status(200).json({data:ActivitiesAndStudentsNotifications,
            message:"Activities and Students Notifications Fetched Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const PostActivitiesAndStudentsNotifications = async (req, res) => {
    try {
        
        const { name, link} = req.body;

        if (!name) {
          return res.status(400).json({ error: "name is required" });
        }
        if (req.file) {
            console.log("the file uploading" , req.file);
      
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });
            const { fileUrl, appwriteFile } = await asFiletoCloud(file);
  
            const newActivitiesAndStudentsNotifications = await ActivitiesAndStudentsNotificationsModel.create({
                link: fileUrl,
                name: req.body.name,
            });
            res.status(201).json({
                data: newActivitiesAndStudentsNotifications,
                message: "Activities and Students Notifications Created Successfully",
            });
        } else {
             const newActivitiesAndStudentsNotifications = await ActivitiesAndStudentsNotificationsModel.create({
                link: req.body.link,
                name: req.body.name,
            });
            res.status(201).json({
                data: newActivitiesAndStudentsNotifications,
                message: "Activities and Students Notifications Created Successfully",
            });
            
        }     
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ error: error.message });
    }
};

export const UpdateActivitiesAndStudentsNotifications = async (req, res) => {
    try {
        const { name, link } = req.body;
        
        // Find and update the document
        const updatedActivitiesAndStudentsNotifications = await ActivitiesAndStudentsNotificationsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedActivitiesAndStudentsNotifications) {
            return res.status(404).json({ error: "Activities and Students Notifications not found" });
        }

        // If file is uploaded, process and update link
        if (req.file) {
            const file = new File([req.file.buffer], req.file.originalname, {
                type: req.file.mimetype,
            });

            const { fileUrl } = await asFiletoCloud(file);
            updatedActivitiesAndStudentsNotifications.link = fileUrl;
            await updatedActivitiesAndStudentsNotifications.save();
        }

        res.status(200).json({
            data: updatedActivitiesAndStudentsNotifications,
            message: "Activities and Students Notifications Updated Successfully"
        });

    } catch (error) {
        console.error("Error updating activities and students notifications:", error);
        res.status(500).json({ error: error.message });
    }
};


export const DeleteActivitiesAndStudentsNotifications = async (req, res) => {
    try {
        const deletedActivitiesAndStudentsNotifications = await ActivitiesAndStudentsNotificationsModel.findByIdAndDelete(req.params.id);
        if (!deletedActivitiesAndStudentsNotifications) {
            return res.status(404).json({ error: "Activities and Students Notifications not found" });
        }
        res.status(200).json({data:deletedActivitiesAndStudentsNotifications,
            message:"Activities and Students Notifications Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
