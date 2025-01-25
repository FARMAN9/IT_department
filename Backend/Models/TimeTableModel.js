import mongoose from 'mongoose';

const TimeTableSchema = new mongoose.Schema({
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
    TimeTable:{
        type: String,
        required: true
    }                      
    
    
    

},{timestamps:true})

const TimeTableModel = mongoose.model('TimeTable',TimeTableSchema);


export default TimeTableModel;