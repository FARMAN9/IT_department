import mongoose from "mongoose";



const ProjectsSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true,
    
    },
    year_of_santion: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    funding_agency: {
        type: String,
        required: true
    },
    sanction_amount: {
        type: String,
        required: true
    },
}, { timestamps: true });


const ProjectsModel = mongoose.model('Projects', ProjectsSchema);
export default ProjectsModel
