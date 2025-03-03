import  CurrentTopPlacementsModel  from "../Models/CurrentTopPlacementsModel.js";
import {asFiletoCloud} from "../Utility/Utility.js";


export const GetAllCurrentTopPlacements = async (req, res) => {
    try {
        const CurrentTopPlacements = await CurrentTopPlacementsModel.find({}).sort({'createdAt':-1}||{'updatedAt':-1});
        res.status(200).json({data:CurrentTopPlacements,
            message:"CurrentTopPlacements Fetched Successfully"
        });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const PostCurrentTopPlacements = async (req, res) => {
  try {
    const { name, company, lpa} = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (!company) {
      return res.status(400).json({ error: "company is required" });
      }
    if (!lpa) {
      return res.status(400).json({ error: "lpa is required" });
      }

   
      if (req.file) {
          console.log("the file uploading" , req.file);
    
          const file = new File([req.file.buffer], req.file.originalname, {
              type: req.file.mimetype,
          });
          const { fileUrl, appwriteFile } = await asFiletoCloud(file);

          const newCurrentTopPlacements = await CurrentTopPlacementsModel.create({
              image: fileUrl,
              name: req.body.name,
              company: req.body.company,
              lpa: req.body.lpa
      
          });
          res.status(201).json({
              data: newCurrentTopPlacements,
              message: "CurrentTopPlacements Created Successfully",
          });
      } else {
           const newCurrentTopPlacements = await CurrentTopPlacementsModel.create({
              image: "",
              name: req.body.name,
              company: req.body.company,
              lpa: req.body.lpa
     
          });
          res.status(201).json({
              data: newCurrentTopPlacements,
              message: "CurrentTopPlacements Created Successfully",
          });
          
      }     
  } catch (error) {
      console.log(error);
      
    res.status(500).json({ error: error.message });
  }
};

export const UpdateCurrentTopPlacements = async (req, res) => {
  try {
    const CurrentTopPlacementsId = req.params.id;
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
    const updatedCurrentTopPlacements = await CurrentTopPlacementsModel.findByIdAndUpdate(
      CurrentTopPlacementsId,
      updateData,
      { 
        new: true,
        runValidators: true // Ensure validators run for updates
      }
    );

    if (!updatedCurrentTopPlacements) {
      return res.status(404).json({ error: "CurrentTopPlacements not found" });
    }

    res.status(200).json({
      data: updatedCurrentTopPlacements,
      message: "CurrentTopPlacements Updated Successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      error: "Server Error",
      message: error.message 
    });
  }
};

export const DeleteCurrentTopPlacements = async (req, res) => {
    try {
        const deletedCurrentTopPlacements = await CurrentTopPlacementsModel.findByIdAndDelete(req.params.id);
        if (!deletedCurrentTopPlacements) {
            return res.status(404).json({ error: "CurrentTopPlacements not found" });
        }
        res.status(200).json({data:deletedCurrentTopPlacements,
            message:"CurrentTopPlacements Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





export const removeCurrentTopPlacementsImage = async (req, res) => {
  try {
    const updatedCurrentTopPlacements = await CurrentTopPlacementsModel.findByIdAndUpdate(
      req.params.id,
      { image: "" },
      { new: true }
    );
    if (!updatedCurrentTopPlacements) {
      return res.status(404).json({ error: "CurrentTopPlacements not found" });
    }
    res.status(200).json({
      data: updatedCurrentTopPlacements,
      message: "Image removed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};