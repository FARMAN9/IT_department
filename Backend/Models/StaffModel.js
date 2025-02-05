import mongoose from "mongoose";



const StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    }
}, { timestamps: true })


const StaffModel = mongoose.model('Staff',StaffSchema);
export default StaffModel