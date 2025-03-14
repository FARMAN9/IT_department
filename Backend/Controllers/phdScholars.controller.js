import PhdscholarsModel from "../Models/PhdscholarsModel.js";
import { asFiletoCloud } from "../Utility/Utility.js";

//rename phd scholars controller


export const GetPhdscholars = async (req, res) => {
  try {
    const Phdscholars = await PhdscholarsModel.find({}).sort(
      { createdAt: -1 } || { updatedAt: -1 }
    );
    res
      .status(200)
      .json({ data: Phdscholars, message: "Phdscholars Fetched Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const PostPhdscholars = async (req, res) => {
  try {
    const { name, email} = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "email is required" });
      }

    const checkEmail = await PhdscholarsModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
      if (req.file) {
          console.log("the file uploading" , req.file);
    
          const file = new File([req.file.buffer], req.file.originalname, {
              type: req.file.mimetype,
          });
          const { fileUrl, appwriteFile } = await asFiletoCloud(file);

          const newPhdscholars = await PhdscholarsModel.create({
              image: fileUrl,
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile,
              linkedin: req.body.linkedin,
              googleScholars: req.body.googleScholars,
              researchGate: req.body.researchGate,
              personallink: req.body.personallink,
              others: req.body.others,
          });
          res.status(201).json({
              data: newPhdscholars,
              message: "Phdscholars Created Successfully",
          });
      } else {
           const newPhdscholars = await PhdscholarsModel.create({
              image: "",
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile,
              linkedin: req.body.linkedin,
              googleScholars: req.body.googleScholars,
              researchGate: req.body.researchGate,
              personallink: req.body.personallink,
              others: req.body.others,
          });
          res.status(201).json({
              data: newPhdscholars,
              message: "Phdscholars Created Successfully",
          });
          
      }     
  } catch (error) {
      console.log(error);
      
    res.status(500).json({ error: error.message });
  }
};

export const UpdatePhdscholars = async (req, res) => {
  try {
    const scholarId = req.params.id;
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
    const updatedPhdscholars = await PhdscholarsModel.findByIdAndUpdate(
      scholarId,
      updateData,
      { 
        new: true,
        runValidators: true // Ensure validators run for updates
      }
    );

    if (!updatedPhdscholars) {
      return res.status(404).json({ error: "Scholar not found" });
    }

    res.status(200).json({
      data: updatedPhdscholars,
      message: "Scholar Updated Successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      error: "Server Error",
      message: error.message 
    });
  }
};

export const DeletePhdscholars = async (req, res) => {
  try {
    const deletedPhdscholars = await PhdscholarsModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPhdscholars) {
      return res.status(404).json({ error: "Phdscholars not found" });
    }
    res.status(200).json({
      data: deletedPhdscholars,
      message: "Phdscholars Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const removePhdscholarsImage = async (req, res) => {
  try {
    const updatedPhdscholars = await PhdscholarsModel.findByIdAndUpdate(
      req.params.id,
      { image: "" },
      { new: true }
    );
    if (!updatedPhdscholars) {
      return res.status(404).json({ error: "Phdscholars not found" });
    }
    res.status(200).json({
      data: updatedPhdscholars,
      message: "Image removed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
