const mongoose = require('mongoose');

const Sem = new mongoose.Schema({
  id:Number,
   name: String
});

const SemSchema = mongoose.model('Sem', Sem,"sem");

module.exports = SemSchema;