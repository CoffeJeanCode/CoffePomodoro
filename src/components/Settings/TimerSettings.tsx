import type { TimerSchema } from "@/models/schemas";
import { Box, Container, Divider, Flex, Group, NumberInput, Progress, Text, Title } from "@mantine/core";

import { values } from "ramda";
import type { FC } from "react";
import { type Configuration, Mode } from "../../models";
import { minutesToSeconds, secondsToMinutes } from "../../utils/time.util";
import SessionViewer from "./components/SessionViewer";
import { SliderSettings } from "./components/SliderSettings";

interface Props {
	configuration: Configuration | TimerSchema;
	// biome-ignore lint: romelint/suspicious/noExplicitAny
	setConfigValue: (path: string, value: any) => void;
}

const TimerSettings: FC<Props> = ({ configuration, setConfigValue }) => {
	const handleUpdateTimer = (mode: Mode, value: number) => {
		setConfigValue(
			`timers.${mode}`,
			import.meta.env.MODE === "development"
				? Math.round(value / 2)
				: minutesToSeconds(value),
		);
	};

	return (
		<Box>
			<Title order={3} size={25}>
				Timers
			</Title>
			<Group mt="md" gap="lg" align="center" justify="center" grow>
				<NumberInput
					label="Work Timer"
					size="xs"
					min={10}
					max={60}
					value={secondsToMinutes(configuration.timers[Mode.Pomodoro])}
					onChange={(value) => handleUpdateTimer(Mode.Pomodoro, Number(value))}
				/>
				<NumberInput
					label="Short Break Timer"
					size="xs"
					min={2}
					max={10}
					value={secondsToMinutes(configuration.timers[Mode.ShortBreak])}
					onChange={(value) =>
						handleUpdateTimer(Mode.ShortBreak, Number(value))
					}
				/>
				<NumberInput
					label="Long Break Timer"
					size="xs"
					min={5}
					max={20}
					value={secondsToMinutes(configuration.timers[Mode.LongBreak])}
					onChange={(value) => handleUpdateTimer(Mode.LongBreak, Number(value))}
				/>
			</Group>

			<Divider mt="lg"></Divider>

			<Container fluid my="md">
				<NumberInput
					label="Pomodoros Sessions"
					size="xs"
					min={2}
					value={configuration.behaviur.pomodorosToLongBreak}
					onChange={(value) =>
						setConfigValue("behaviur.pomodorosToLongBreak", value)
					}
				/>
			</Container>

			<Title order={4}>Session Preview</Title>
			<SessionViewer configuration={configuration} />
		</Box>
	);
};

export default TimerSettings;
