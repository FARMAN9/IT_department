import Mission from '../Models/MissionModel.js';

export const PostMission = async (req, res) => {    
    try {
        const mission = await Mission.create({
            mission: req.body.mission
        });
        res.status(201).json(mission);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    } 
    }

export const GetMission = async (req, res) => {
    try {
        const missions = await Mission.find({});
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

export const DeleteMission = async (req, res) => {
    try {
        const mission = await Mission.findByIdAndDelete(req.params.id);
        if (!mission) {
            return res.status(404).json({ error: "Mission not found" });
        }
        res.status(200).json({ message: "Mission deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const UpdateMission = async (req, res) => {
    try {
        const mission = await Mission.findByIdAndUpdate(req.params.id,{
            mission: req.body.mission
        }, { new: true });
        if (!mission) {
            return res.status(404).json({ error: "Mission not found" });
        }
        res.status(200).json(mission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
