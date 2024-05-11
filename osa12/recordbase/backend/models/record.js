const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  recordname: String,
  artist: String,
  year: Number
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;