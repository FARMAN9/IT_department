import mongoose from 'mongoose';
const missionSchema = new mongoose.Schema({
    mission: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Mission = mongoose.model('Mission', missionSchema);

export default Mission
