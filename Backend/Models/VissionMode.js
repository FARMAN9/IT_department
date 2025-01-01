import mongoose from "mongoose";

const visionSchema = new mongoose.Schema({
    vision: {
        type: String,
        required: true

    },
  
}, { timestamps: true });

const vision = mongoose.model('Vision',visionSchema);

export default vision
