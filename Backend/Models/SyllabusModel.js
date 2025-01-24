import mongoose from 'mongoose';

const SyllabusSchema = new mongoose.Schema({
    Programe:{
        type: String,
        required: true
    },
    Batch:{
        type: String,
        required: true
    },
    Syllabus:{
        type: String,
        required: true
    },                      
    Coordinators:{
        type: String,
        required: true
    }
    
    

},{timestamps:true})

const SyllabusModel = mongoose.model('Syllabus',SyllabusSchema);


export default SyllabusModel;