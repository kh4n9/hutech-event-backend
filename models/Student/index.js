const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
  studentCode: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  isMonitor: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Student", Student);
