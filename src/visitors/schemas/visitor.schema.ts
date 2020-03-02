import * as mongoose from 'mongoose';

export const VisitorSchema = new mongoose.Schema({
	id: String,
	timestamp: Date,
	country: String,
	browser: String,
	path: String,
});
