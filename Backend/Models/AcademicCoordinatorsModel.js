import mongoose from 'mongoose';

const AcademicCoordinatorsSchema = new mongoose.Schema({
    Programe:{
        type: String,
        required: true
    },
    Batch:{
        type: String,
        required: true
    },
    Semester:{
        type: String,
        required: true
    },
    Coordinators:{
        type: String,
        required: true
    },
    Session:{
        type: String,
        required: true
    }
    
    

},{timestamps:true})

const AcademicCoordinatorsModel = mongoose.model('AcademicCoordinators',AcademicCoordinatorsSchema);



export default AcademicCoordinatorsModel;