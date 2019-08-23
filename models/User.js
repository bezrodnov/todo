const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
  birthDate: { type: Date },
  gender: { type: String },
  phone: { type: String },
  language: { type: String },
});

schema.virtual('name').get(function() {
  return `${this.firstName}${this.lastName ? ' ' + this.lastName : ''}`;
});

const model = mongoose.model('user', schema);
module.exports = model;
