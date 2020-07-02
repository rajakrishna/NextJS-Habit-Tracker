export const habitsResolvers = {
	Query: {
		async habits() {
			console.log("habits");
			return [
				{
					_id: "funkyarray",
					name: "make my bed",
				},
			];
		},
	},
};
