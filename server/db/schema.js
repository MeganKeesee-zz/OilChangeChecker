const mongoose = require('mongoose');
const db = require('./db.js');

mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
  user: String,
  dateOfLastOC: Date,
  prevOdometerReading: Number,
  suggestedInterval: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;