import mongoose from "mongoose";

const PhdscholarsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
      
    },
    mobile:{
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

const Phdscholars = mongoose.model('Phdscholars',PhdscholarsSchema);

export default Phdscholars   