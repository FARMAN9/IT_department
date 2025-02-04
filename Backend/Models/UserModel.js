import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    role: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,

    },
    image:{
        type: String,
        required: false,
        default: ""
    },
    designation:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: false
    },
    status:{
        type: String,
        default: "active"
    },
    resume:{
        type: String,
        required: false
    },
    qualification:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    linkedin:{
        type: String,
        required: false
    },
     googleScholars:{
        type: String,
        required: false
    },
     researchGate :{
        type: String,
        required: false
    },
     others:{
        type: String,
        required: false
    },
    personallink:{
        type: String,
        required: false
    }
     
    


  
}, { timestamps: true });

const User = mongoose.model('User',UserSchema);

export default User   