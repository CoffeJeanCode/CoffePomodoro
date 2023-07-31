import { Box, NumberInput, Switch, Title } from "@mantine/core";

import { FC } from "react";
import { Configuration } from "../../models";

interface Props {
	configuration: Configuration;
	// rome-ignore lint: romelint/suspicious/noExplicitAny
	setConfigValue: (path: string, value: any) => void;
}

const BehaviurSettings: FC<Props> = ({ configuration, setConfigValue }) => {
	return (
		<Box my={20}>
			<Title order={3} size={25}>
				Behaviur
			</Title>
			<Switch
				label="Auto play timer"
				onLabel="ON"
				offLabel="OFF"
				size="md"
				checked={configuration.behaviur.canAutoPlay}
				onChange={(event) => setConfigValue("behaviur.canAutoPlay", event.currentTarget.checked)}
			/>

			<Title order={3} size={25}>
				Pomodoros To Long Break
			</Title>
			<NumberInput
				label="Auto play timer"
				size="xs"
				min={2}
				value={configuration.behaviur.pomodorosToLongBreak}
				onChange={(value) => setConfigValue("behaviur.pomodorosToLongBreak", value)}
			/>
		</Box>
	);
};

export default BehaviurSettings;
