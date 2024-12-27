const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventRegistrationSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  query: {
    type: String,
    default: "",
  },
  reminder24hSent: { type: Boolean, default: false }, // Add this field
  reminder1hSent: { type: Boolean, default: false }, // Add this field
});

module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);
