const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Certify = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  cefTitle: {
    type: String,
    default: null,
  },
  cefUrl: {
    type: String,
    default: null,
  },
  // số thứ tự
  serialNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  templateId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
});

module.exports = mongoose.model("Certify", Certify);
