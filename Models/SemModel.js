const mongoose = require('mongoose');

const semSchema = new mongoose.Schema({
  SEATNO: Number,
  NAME: String,
  COLLEGE:String
});

const SemModel = mongoose.model('Sem 3', semSchema,"sem3old");

module.exports = SemModel;