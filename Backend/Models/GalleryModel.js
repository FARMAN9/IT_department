import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

},{timestamps:true})
module.exports = mongoose.model('Gallery',gallerySchema);
