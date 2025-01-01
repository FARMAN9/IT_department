import mongoose from 'mongoose';

const MainImagesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{timestamps:true})

const MainImages = mongoose.model('MainImagesSlide',MainImagesSchema);

export default MainImages
