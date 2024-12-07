const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Label = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Label", Label);
