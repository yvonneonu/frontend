const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const allsectorSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

const Allsector = mongoose.model("AllSector", allsectorSchema);

module.exports = Allsector;
