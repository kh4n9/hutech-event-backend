const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  allowCheckin: {
    type: Boolean,
    required: true,
    default: true,
  },
  hidden: {
    type: Boolean,
    required: true,
    default: false,
  },
  checkinStart: {
    type: Date,
  },
  checkinEnd: {
    type: Date,
  },
  checkinLimitTime: {
    type: Boolean,
    required: true,
    default: false,
  },
  yearCode: {
    type: String,
    required: true,
    default: "",
  },
  allowCertify: {
    type: Boolean,
    required: true,
    default: true,
  },
  templateId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  hostBy: {
    type: String,
    required: true,
    default: "",
  },
});

module.exports = mongoose.model("Event", Event);
