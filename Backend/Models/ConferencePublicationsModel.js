import mongoose from "mongoose";

const ConferencePublicationsSchema = new mongoose.Schema({
   User:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
   },
   publication:{
    type: String,
       required: true
    
    },
    conference: {
        type: String,
        required: true
    
    },
    year:{
        type: String,
        required: true
    
    },
    link:{
        type: String,
        required: true
    
    }
    

   
  
}, { timestamps: true });

const ConferencePublications = mongoose.model('ConferencePublications',ConferencePublicationsSchema);

export default ConferencePublications   