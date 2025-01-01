import vision from "../Models/VissionMode.js";


export const GetVision = async (req, res) => {
    try {
        const visions = await vision.find({});
        res.status(200).json(visions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const PostVision = async (req, res) => {
    try {
        const newVision = await vision.create({
            vision: req.body.vision
        });
        res.status(201).json(newVision);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateVision = async (req, res) => {
    try {
        const updatedVision = await vision.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVision) {
            return res.status(404).json({ error: "Vision not found" });
        }
        res.status(200).json(updatedVision);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteVision = async (req, res) => {
    try {
        const deletedVision = await vision.findByIdAndDelete(req.params.id);
        if (!deletedVision) {
            return res.status(404).json({ error: "Vision not found" });
        }
        res.status(200).json({ message: "Vision deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
