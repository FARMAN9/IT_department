import mongoose from "mongoose";





const DepartmentsLabsSchema = new mongoose.Schema({
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
    Incharge:{
        type: String,
        required: false
    }
}, { timestamps: true })




const DepartmentsLabs = mongoose.model('DepartmentsLabs', DepartmentsLabsSchema);
export default DepartmentsLabs;