import ResearchlabsModel from "../Models/ResearchlabsModel.js";

import { asFiletoCloud } from "../Utility/Utility.js";

export const GetAllResearchLabs = async (req, res) => {
  try {
    const ResearchLabs = await ResearchlabsModel.find({}).sort(
      { createdAt: -1 } || { updatedAt: -1 }
    );
    res.status(200).json({
      data: ResearchLabs,
      message: "ResearchLabs Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const PostResearchLabs = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const file = new File([req.file.buffer], req.file.originalname, {
      type: req.file.mimetype,
    });
    const { fileUrl, appwriteFile } = await asFiletoCloud(file);

    const newResearchLabs = await ResearchlabsModel.create({
      name: req.body.name,
      description: req.body.description,
      image: fileUrl,
      Incharge: req.body.Incharge,
      location: req.body.location,
    });
    res.status(201).json({
      data: newResearchLabs,
      message: "ResearchLabs Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const UpdateResearchLabs = async (req, res) => {
  try {
    const updatedResearchLabs = await ResearchlabsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (req.file) {
      const file = new File([req.file.buffer], req.file.originalname, {
        type: req.file.mimetype,
      });
      const { fileUrl, appwriteFile } = await asFiletoCloud(file);
      updatedResearchLabs.image = fileUrl;
    }
    await updatedResearchLabs.save();


    if (!updatedResearchLabs) {
      return res.status(404).json({ error: "ResearchLabs not found" });
    }
    res.status(200).json({
      data: updatedResearchLabs,
      message: "ResearchLabs Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteResearchLabs = async (req, res) => {
  try {
    const deletedResearchLabs = await ResearchlabsModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedResearchLabs) {
      return res.status(404).json({ error: "ResearchLabs not found" });
    }

    res.status(200).json({
      data: deletedResearchLabs,
      message: "ResearchLabs Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeResearchLabsImage = async (req, res) => {
  try {
    const updatedResearchLabs = await ResearchlabsModel.findByIdAndUpdate(
      req.params.id,
      { image: "" },
      { new: true }
    );
    if (!updatedResearchLabs) {
      return res.status(404).json({ error: "ResearchLabs not found" });
    }
    res.status(200).json({
      data: updatedResearchLabs,
      message: "Image removed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putResearchLabsManual = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Lab manual is required" });
    }
    const file = new File([req.file.buffer], req.file.originalname, {
      type: req.file.mimetype,
    });
    const { fileUrl, appwriteFile } = await asFiletoCloud(file);
    const updatedLabManual = await ResearchlabsModel.findByIdAndUpdate(
      req.params.id,
      { lab_manual: fileUrl },
      { new: true }
    );
    if (!updatedLabManual) {
      return res.status(404).json({ error: "ResearchLabs not found" });
    }
    res.status(200).json({
      data: updatedLabManual,
      message: "Lab manual updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeResearchLabsManual = async (req, res) => {
  try {
    const updatedResearchLabsManual = await ResearchlabsModel.findByIdAndUpdate(
      req.params.id,
      { lab_manual: "" },
      { new: true }
    );
    if (!updatedResearchLabsManual) {
      return res.status(404).json({ error: "ResearchLabs not found" });
    }
    res.status(200).json({
      data: updatedResearchLabsManual,
      message: "Lab manual removed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
