const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
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
  },
  hidden: {
    type: Boolean,
    required: true,
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
  },
  yearCode: {
    type: String,
    required: true,
  },
  allowCertify: {
    type: Boolean,
  },
  templateId: {
    type: Schema.Types.ObjectId,
  },
  hostBy: {
    type: String,
  },
});

module.exports = mongoose.model("Event", Event);
