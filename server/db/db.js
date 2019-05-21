const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:8000';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

module.exports = db;