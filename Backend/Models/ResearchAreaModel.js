import mongoose from "mongoose";


const ResearchAreaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    location:{
        type: String,
        required: false
    }

    
}, { timestamps: true })

const ResearchAreasModel = mongoose.model('ResearchArea', ResearchAreaSchema);

export default ResearchAreasModel

