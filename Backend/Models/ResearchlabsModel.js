import mongoose from "mongoose";

const ResearchlabsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    lab_manual: {
      type: String,
      required: false,
    },
    Incharge: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ResearchlabsModel = mongoose.model("Researchlabs", ResearchlabsSchema);
export default ResearchlabsModel;
