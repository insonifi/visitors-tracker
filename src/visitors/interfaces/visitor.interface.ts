import {Document } from 'mongoose';

export interface Visitor extends Document {
	id: string;
	timestamp: Date;
	country: string;
	browser: string;
	path: string;
}
