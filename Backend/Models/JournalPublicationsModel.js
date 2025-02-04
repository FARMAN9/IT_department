import mongoose from "mongoose";

const JournalPublicationsSchema = new mongoose.Schema({
   User:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
   },
   name:{
    type: String,
       required: true
    
    },
    author_title: {
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

const JournalPublications = mongoose.model('JournalPublications',JournalPublicationsSchema);

export default JournalPublications   