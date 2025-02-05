import mongoose from "mongoose";



const StudentsSchema = new mongoose.Schema({
  program:{
      type: String,
      required: true
  },
  batch:{
      type: String,
      required: true
    },
  pdf:{
      type: String,
      required: true
    }
}, { timestamps: true })

const StudentsModel = mongoose.model('Students',StudentsSchema);

export default StudentsModel