const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Prince:prince%402563@prince25.ublcpff.mongodb.net/';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
module.exports = db;