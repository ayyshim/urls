const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const URLSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true
    },
    link: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("url", URLSchema);
