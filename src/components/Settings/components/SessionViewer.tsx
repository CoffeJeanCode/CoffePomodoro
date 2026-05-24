import { type Configuration, Mode } from "@/models";
import type { TimerSchema } from "@/models/schemas";
import { POMODOROS_TO_LONG_BREAK } from "@/stores/constants";
import { getModeTitle } from "@/utils/modeLabels";
import { secondsToMinutes } from "@/utils/time.util";
import { Progress } from "@mantine/core";
import type React from "react";

interface Props {
	configuration: Configuration | TimerSchema;
}

const SessionViewer: React.FC<Props> = ({ configuration }) => {
	const { timers } = configuration;
	const pomodorosToLongBreak = POMODOROS_TO_LONG_BREAK;

	// Sequence: P, S, P, S, ..., P, L (N pomodoros, N-1 short breaks, 1 long break after last P)
	const sessionBlocks = [];
	for (let i = 0; i < pomodorosToLongBreak; i++) {
		sessionBlocks.push({
			value: timers[Mode.Pomodoro],
			color: "blue.8",
			label: getModeTitle(Mode.Pomodoro),
		});
		const isLastPomodoro = i === pomodorosToLongBreak - 1;
		const breakMode = isLastPomodoro ? Mode.LongBreak : Mode.ShortBreak;
		sessionBlocks.push({
			value: timers[breakMode],
			color: isLastPomodoro ? "blue.4" : "blue.6",
			label: getModeTitle(breakMode),
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
			<Progress.Root size="24" radius={"md"} mt="md">
				{progressValues.map(({ value, color, label, displayTime }, index) => (
					<Progress.Section
						key={`${index}-${value}`}
						value={value}
						color={color}
						title={`${label} – ${displayTime}m`}
					>
						{value >= 8 && (
							<Progress.Label
								style={{
									fontSize: "0.625rem",
									lineHeight: "24px",
									whiteSpace: "nowrap",
								}}
							>
								{displayTime}m
							</Progress.Label>
						)}
					</Progress.Section>
				))}
			</Progress.Root>
		</>
	);
};

export default SessionViewer;
