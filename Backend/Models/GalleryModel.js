import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
    
},{timestamps:true})
const GalleryModel = mongoose.model('Gallery',gallerySchema);

export default GalleryModel
