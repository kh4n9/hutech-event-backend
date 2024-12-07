const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
  studentId: {
    type: String,
    required: true,
  },
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
  },
  facebook: {
    type: String,
  },
  isMonitor: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Student", Student);
