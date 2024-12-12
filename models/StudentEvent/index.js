const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentEvent = new Schema({
  studentId: { type: Schema.Types.ObjectId, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  checkinTime: { type: Date, default: Date.now },
  checkoutTime: { type: Date, default: null },
});

module.exports = mongoose.model("StudentEvent", StudentEvent);
