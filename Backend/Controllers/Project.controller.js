import ProjectsModel from "../Models/ProjectsModel.js";


export const GetProjects = async (req, res) => {
    try {
        const projects = await ProjectsModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const PostProjects = async (req, res) => {
    try {
        const newVision = await ProjectsModel.create({
            title: req.body.title,
            year_of_sanction: req.body.year_of_sanction,
            link: req.body.link,
            funding_agency: req.body.funding_agency,
            sanction_amount: req.body.sanction_amount
        });
        res.status(201).json(newVision);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateProjects = async (req, res) => {
    try {
        const updatedProjects = await ProjectsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProjects) {
            return res.status(404).json({ error: "Projects not found" });
        }
        res.status(200).json(updatedProjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteProjects = async (req, res) => {
    try {
        const deletedProjects = await ProjectsModel.findByIdAndDelete(req.params.id);
        if (!deletedProjects) {
            return res.status(404).json({ error: "Projects not found" });
        }
        res.status(200).json({ message: "Projects deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
