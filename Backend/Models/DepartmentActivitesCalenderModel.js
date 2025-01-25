import mongoose from "mongoose";





const DepartmentActivitesCalenderSchema = new mongoose.Schema({
     _id: { 
        type: String,  // or Number if you specifically need numbers
        required: true 
    },
    Department:{
        type: String,
       
    },
    Year:{
        type: String,
    },
    ActivitesCalender:{
        type: String,
        required: true
    }   
}, { timestamps: true })




const DepartmentActivitesCalenderModel = mongoose.model('DepartmentActivitesCalender',DepartmentActivitesCalenderSchema);
export default DepartmentActivitesCalenderModel;