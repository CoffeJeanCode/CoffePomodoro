import type { TimerSchema } from "@/models/schemas";
import { Box, Group, NumberInput, Switch, Title } from "@mantine/core";

import type { FC } from "react";
import type { Configuration } from "../../models";

interface Props {
	configuration: Configuration | TimerSchema;
	setConfigValue: (path: string, value: string | number | boolean) => void;
}

const BehaviurSettings: FC<Props> = ({ configuration, setConfigValue }) => {
	return (
		<Box>
			<Title order={3} size={25}>
				Behaviur
			</Title>
			<Group gap="lg" my="xs">
				<Switch
					label="Auto play timer"
					onLabel="ON"
					offLabel="OFF"
					size="md"
					checked={configuration.behaviur.canAutoPlay}
					onChange={(event) =>
						setConfigValue("behaviur.canAutoPlay", event.currentTarget.checked)
					}
				/>
			</Group>
		</Box>
	);
};

export default BehaviurSettings;
