const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicEvent = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("TopicEvent", TopicEvent);
