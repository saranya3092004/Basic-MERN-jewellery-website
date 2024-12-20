const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Slider", sliderSchema);
