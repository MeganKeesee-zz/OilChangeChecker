const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost/User";

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

module.exports = db;
