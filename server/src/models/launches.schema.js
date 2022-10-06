const { Schema, model } = require("mongoose");

const launchSchema = new Schema({
  flightNumber: {
    type: Number,
    required: [true, "You must provide Flight Number"],
  },
  launchDate: {
    type: Date,
    required: [true, "You must provide Launch Date"],
  },
  upcoming: {
    type: Boolean,
    default: true,
    required: true,
  },
  mission: {
    type: String,
    required: [true, "You must provide Mission"],
  },
  rocket: {
    type: String,
  },
  target: {
    type: String,
    required: [true, "You must provide Destination"],
  },
  upcoming: {
    type: Boolean,
    default: true,
    required: true,
  },
  success: {
    type: Boolean,
    default: true,
    required: true,
  },
  customers: [String],
});

module.exports = model("Launch", launchSchema);
