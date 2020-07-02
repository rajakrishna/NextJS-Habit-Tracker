// Database collections
import mongoose, { Schema } from "mongoose";

// Schema to be inputted to the MongoDB
export const HabitsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

// if it has a model use it or create one
export default mongoose.models.habits || mongoose.model("habits", HabitsSchema);