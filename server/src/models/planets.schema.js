const { Schema, model } = require("mongoose");
const planetSchema = new Schema({
  keplerName: {
    type: String,
    required: true,
  },
  Disposition: {
    type: String,
    required: true,
  },
  Score: {
    type: Number,
    required: true,
    default: 0.0,
  },
  Insol: {
    type: Number,
    required: true,
    default: 0.0,
  },
  Prad: {
    type: Number,
    required: true,
    default: 0.0,
  },
});

module.exports = model("Planet", planetSchema);
