import { useState } from "react";

const HabitButton = ({ date }) => {
	const [complete, setComplete] = useState(false);
	return (
		<span>
			{date.getMonth() + 1}/{date.getDate()}
			<button
				onClick={() => {
					setComplete(!complete);
				}}
			>
				{complete ? "X" : "O"}
			</button>
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
