import mongoose from "mongoose";

const CurrentTopPlacementsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: true,
    },
    lpa: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CurrentTopPlacementsModel = mongoose.model(
  "CurrentTopPlacements",
  CurrentTopPlacementsSchema
);

export default CurrentTopPlacementsModel;
