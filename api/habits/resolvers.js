import Habits from "./habits";

export const habitsResolvers = {
	Query: {
		async habits() {
			try {
				const habits = await Habits.find();
				return habits;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
