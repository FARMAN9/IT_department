import mongoose from "mongoose";



const StudentsSchema = new mongoose.Schema({
  Programe:{
      type: String,
      required: true
  },
  Batch:{
      type: String,
      required: true
    },
    Students:{
      type: String,
      required: true
    }
}, { timestamps: true })

const StudentsModel = mongoose.model('Students',StudentsSchema);

export default StudentsModel