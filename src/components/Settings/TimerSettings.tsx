import type { TimerSchema } from "@/models/schemas";
import {
	Box,
	Divider,
	NumberInput,
	SimpleGrid,
	Stack,
	Title,
} from "@mantine/core";
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
		<Box style={{ maxWidth: "100%" }}>
			<SimpleGrid cols={1} spacing="sm">
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
			</SimpleGrid>

			<Divider my="md" />

			<NumberInput
				label="Pomodoros per long break"
				size="xs"
				min={2}
				value={configuration.behavior.pomodorosToLongBreak}
				onChange={(value) =>
					setConfigValue("behavior.pomodorosToLongBreak", value)
				}
			/>

			<Title order={4}>Session Preview</Title>
			<SessionViewer configuration={configuration} />
		</Box>
	);
};

export default TimerSettings;
