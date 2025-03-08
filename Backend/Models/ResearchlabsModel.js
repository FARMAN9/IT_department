import mongoose from "mongoose";





const ResearchlabsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    },
    discription:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    lab_manual:{
        type: String,
        required: false
    },
    
    Incharge:{
        type: String,
        required: false
    }
}, { timestamps: true })




const ResearchlabsModel = mongoose.model('Researchlabs', ResearchlabsSchema);
export default ResearchlabsModel;