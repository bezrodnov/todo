const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  notes: { type: String },
  creationDate: { type: Date, default: Date.now },
  estimatedDate: { type: Date },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  priority: { type: String },
  tags: { type: String },
});

const model = mongoose.model('task', schema);
module.exports = model;
