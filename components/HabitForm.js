import { Form, Field } from "@leveluptuts/fresh";

const HabitForm = ({ setHabits }) => {
	return (
		// In fresh use the lowecase version of the title to get the data like
		// data.habit for the title 'Habit'
		<Form
			onSubmit={(data) => {
				console.log(data);
				// add the previous state(previous habits) and the new habit to the state
				setHabits((prevState) => [...prevState, data.habit]);
			}}
		>
			<Field>Habit</Field>
		</Form>
	);
};

export default HabitForm;
