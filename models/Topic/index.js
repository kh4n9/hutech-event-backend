const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topic = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Topic", Topic);
