const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CefTemplateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("CefTemplate", CefTemplateSchema);
