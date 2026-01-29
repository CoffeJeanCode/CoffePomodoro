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

	// Sequence: P, S, P, S, ..., P, L (N pomodoros, N-1 short breaks, 1 long break after last P)
	const sessionBlocks = [];
	for (let i = 0; i < pomodorosToLongBreak; i++) {
		sessionBlocks.push({
			value: timers[Mode.Pomodoro],
			color: "blue.8",
			label: "Work",
		});
		const isLastPomodoro = i === pomodorosToLongBreak - 1;
		sessionBlocks.push({
			value: isLastPomodoro
				? timers[Mode.LongBreak]
				: timers[Mode.ShortBreak],
			color: isLastPomodoro ? "blue.4" : "blue.6",
			label: isLastPomodoro ? "Long Break" : "Short Break",
		});
	}

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
