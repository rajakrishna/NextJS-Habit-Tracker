import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_EVENT = gql`
	mutation addEvent($date: Date, $habitId: ID) {
		addEvent(date: $date, habitId: $habitId) {
			_id
			name
			events {
				_id
				date
			}
		}
	}
`;

const REMOVE_EVENT = gql`
	mutation removeEvent($eventId: ID, $habitId: ID) {
		removeEvent(eventId: $eventId, habitId: $habitId) {
			_id
			name
			events {
				_id
				date
			}
		}
	}
`;

const HabitButton = ({ date, habitId }) => {
	const [addEvent] = useMutation(ADD_EVENT, {
		refetchQueries: ["getHabits"],
	});
	const [removeEvent] = useMutation(REMOVE_EVENT, {
		refetchQueries: ["getHabits"],
	});

	const found = false;

	return (
		<span>
			{date.getMonth() + 1}/{date.getDate()}
			{found ? (
				<button
					onClick={() => {
						removeEvent({
							variables: {
								habitId,
								eventId: "ifiwfn",
							},
						});
					}}
				>
					X
				</button>
			) : (
				<button
					onClick={() => {
						addEvent({
							variables: {
								habitId,
								date,
							},
						});
					}}
				>
					O
				</button>
			)}
			<style jsx>{`
				span {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}

				span + span {
					margin-left: 10px;
				}
				button {
					margin-top: 1rem;
					border: none;
					width: 40px;
				}
			`}</style>
		</span>
	);
};

export default HabitButton;
