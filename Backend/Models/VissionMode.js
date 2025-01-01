import mongoose from "mongoose";

const visionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
  
}, { timestamps: true });

module.exports = mongoose.model('Vision',visionSchema);
