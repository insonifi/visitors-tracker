const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	id: String,
	timestamp: Date,
	country: String,
	browser: String,
	pageId: String,
});

