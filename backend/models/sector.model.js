const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectorSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    agree: {
      type: Boolean,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Sector = mongoose.model("Sector", sectorSchema);

module.exports = Sector;
