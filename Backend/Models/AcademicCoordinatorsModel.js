import mongoose from 'mongoose';

const AcademicCoordinatorsSchema = new mongoose.Schema({
    Programe:{
        type: String,
        required: true
    },
    Coordinators:{
        type: String,
        required: true
    }
    
    

},{timestamps:true})

const AcademicCoordinatorsModel = mongoose.model('AcademicCoordinators',AcademicCoordinatorsSchema);


export default AcademicCoordinatorsModel;