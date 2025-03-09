import mongoose from "mongoose";

const ProjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year_of_sanction: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    funding_agency: {
      type: String,
      required: true,
    },
    sanction_amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectsModel = mongoose.model("Projects", ProjectsSchema);
export default ProjectsModel;
