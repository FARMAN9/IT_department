import mongoose from 'mongoose';

const MainInfoSchema = new mongoose.Schema({
    _id: { 
        type: String,  // or Number if you specifically need numbers
        required: true 
    },
    id: {
        type: String,
        
    },
    image: {
        type: String,
       
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    officeMail:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    }

    

},{timestamps:true})

const MainInfo = mongoose.model('MainInfo',MainInfoSchema);


export default MainInfo