import mongoose from "mongoose";



const CurrentTopPlacementsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    Company: {
        type: String,
        required: true
    },
    Lpa: {
        type: String,
        required: true
    }
}, { timestamps: true })


const CurrentTopPlacementsModel = mongoose.model('CurrentTopPlacements', CurrentTopPlacementsSchema);

export default CurrentTopPlacementsModel
