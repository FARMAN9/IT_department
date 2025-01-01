import mongoose from 'mongoose';
const missionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Mission', missionSchema);
