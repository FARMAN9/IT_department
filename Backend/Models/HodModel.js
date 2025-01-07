import mongoose from 'mongoose';

const HodInfoSchema = new mongoose.Schema({
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
        
    },
    HodMessage:{
        type: String,
        
    },
    address:{
        
        
    },
    officeMail:{
        type: String,
        
    },
    phoneNumber:{
        type: String,
        
    }

    

},{timestamps:true})

const HodInfo = mongoose.model('HodInfo',HodInfoSchema);


export default HodInfo;