import  StaffsModel  from "../Models/StaffModel.js";
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
    const { name, email} = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "email is required" });
      }

    const checkEmail = await StaffsModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
      if (req.file) {
          console.log("the file uploading" , req.file);
    
          const file = new File([req.file.buffer], req.file.originalname, {
              type: req.file.mimetype,
          });
          const { fileUrl, appwriteFile } = await asFiletoCloud(file);

          const newStaffs = await StaffsModel.create({
              image: fileUrl,
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile
      
          });
          res.status(201).json({
              data: newStaffs,
              message: "Staffs Created Successfully",
          });
      } else {
           const newStaffs = await StaffsModel.create({
              image: "",
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile
     
          });
          res.status(201).json({
              data: newStaffs,
              message: "Staffs Created Successfully",
          });
          
      }     
  } catch (error) {
      console.log(error);
      
    res.status(500).json({ error: error.message });
  }
};

export const UpdateStaffs = async (req, res) => {
  try {
    const staffId = req.params.id;
    let updateData = { ...req.body };

    // Handle file upload first if present
    if (req.file) {
      const file = new File([req.file.buffer], req.file.originalname, {
        type: req.file.mimetype,
      });
      
      const { fileUrl } = await asFiletoCloud(file);
      if (!fileUrl) {
        return res.status(400).json({ error: "Failed to upload image" });
      }
      updateData.image = fileUrl;
    }

    // Update the document
    const updatedStaffs = await StaffsModel.findByIdAndUpdate(
      staffId,
      updateData,
      { 
        new: true,
        runValidators: true // Ensure validators run for updates
      }
    );

    if (!updatedStaffs) {
      return res.status(404).json({ error: "Staffs not found" });
    }

    res.status(200).json({
      data: updatedStaffs,
      message: "Staffs Updated Successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      error: "Server Error",
      message: error.message 
    });
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


export const removeStaffsImage = async (req, res) => {
  try {
    const updatedStaffs = await StaffsModel.findByIdAndUpdate(
      req.params.id,
      { image: "" },
      { new: true }
    );
    if (!updatedStaffs) {
      return res.status(404).json({ error: "Staffs not found" });
    }
    res.status(200).json({
      data: updatedStaffs,
      message: "Image removed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};