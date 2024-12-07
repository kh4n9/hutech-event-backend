const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Certify = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
  },
  dateCreated: {
    type: Date,
  },
  cefTitle: {
    type: String,
  },
  cefUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Certify", Certify);
