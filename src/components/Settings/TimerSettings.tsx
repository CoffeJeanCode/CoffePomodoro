import { Box, Group, Title } from "@mantine/core";

import { FC } from "react";
import { Configuration, Mode } from "../../models";
import { minutesToSeconds, secondsToMinutes } from "../../utils/time.util";
import { SliderSettings } from "./SliderSettings";

interface Props {
	configuration: Configuration;
	// rome-ignore lint: romelint/suspicious/noExplicitAny
	setConfigValue: (path: string, value: any) => void;
}

const TimerSettings: FC<Props> = ({ configuration, setConfigValue }) => {
	return (
		<Box my={20}>
			<Title order={3} size={25}>
				Timers
			</Title>
			<Group>
				<SliderSettings
					title="Work Timer"
					min={10}
					max={60}
					marks={[
						{
							value: 25,
							label: "25",
						},
						{
							value: 40,
							label: "40",
						},
						{
							value: 60,
							label: "60",
						},
					]}
					defaultValue={secondsToMinutes(configuration.timers[Mode.Pomodoro])}
					onChange={(value) =>
						setConfigValue(
							`timers.${Mode.Pomodoro}`,
							import.meta.env.MODE === "development" ? value : minutesToSeconds(value),
						)
					}
				/>
				<SliderSettings
					title="Short Break Timer"
					min={3}
					max={10}
					marks={[
						{
							value: 5,
							label: "5",
						},
						{
							value: 7,
							label: "7",
						},
						{
							value: 10,
							label: "10",
						},
					]}
					defaultValue={secondsToMinutes(configuration.timers[Mode.ShortBreak])}
					onChange={(value) =>
						setConfigValue(
							`timers.${Mode.ShortBreak}`,
							import.meta.env.MODE === "development" ? value : minutesToSeconds(value),
						)
					}
				/>
				<SliderSettings
					title="Long Break Timer"
					min={5}
					max={20}
					marks={[
						{
							value: 5,
							label: "5",
						},
						{
							value: 10,
							label: "10",
						},
						{
							value: 15,
							label: "15",
						},
						{
							value: 20,
							label: "20",
						},
					]}
					defaultValue={secondsToMinutes(configuration.timers[Mode.LongBreak])}
					onChange={(value) => setConfigValue(`timers.${Mode.LongBreak}`, minutesToSeconds(value))}
				/>
			</Group>
		</Box>
	);
};

export default TimerSettings;
