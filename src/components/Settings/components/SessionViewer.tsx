import { type Configuration, Mode } from "@/models";
import type { TimerSchema } from "@/models/schemas";
import { secondsToMinutes } from "@/utils/time.util";
import { Progress } from "@mantine/core";
import type React from "react";

interface Props {
	configuration: Configuration | TimerSchema;
}

const SessionViewer: React.FC<Props> = ({ configuration }) => {
	const { timers, behaviur } = configuration;
	const { pomodorosToLongBreak } = behaviur;

	const sessionBlocks = [];
	for (let i = 0; i < pomodorosToLongBreak; i++) {
		sessionBlocks.push({
			value: timers[Mode.Pomodoro],
			color: "blue.8",
			label: "Work",
		});
		sessionBlocks.push({
			value: timers[Mode.ShortBreak],
			color: "blue.6",
			label: "Short Break",
		});
	}
	sessionBlocks.push({
		value: timers[Mode.LongBreak],
		color: "blue.4",
		label: "Long Break",
	});

	const totalTime = sessionBlocks.reduce(
		(acc, session) => acc + session.value,
		0,
	);
	const progressValues = sessionBlocks.map((session) => ({
		...session,
		value: (session.value / totalTime) * 100,
		displayTime: secondsToMinutes(session.value),
	}));

	return (
		<>
			<Progress.Root size="20" radius={"md"} mt="md">
				{progressValues.map(({ value, color }, index) => (
					<Progress.Section
						key={`${index}-${value}`}
						value={value}
						color={color}
					/>
				))}
			</Progress.Root>
		</>
	);
};

export default SessionViewer;
