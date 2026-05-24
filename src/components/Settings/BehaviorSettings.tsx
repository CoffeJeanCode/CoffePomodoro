import type { TimerSchema } from "@/models/schemas";
import { Box, Group, NumberInput, Stack, Switch } from "@mantine/core";

import type { FC } from "react";
import type { Configuration } from "../../models";

interface Props {
	configuration: Configuration | TimerSchema;
	setConfigValue: (path: string, value: string | number | boolean) => void;
}

const BehaviorSettings: FC<Props> = ({ configuration, setConfigValue }) => {
	const b = configuration.behavior;

	return (
		<Box style={{ maxWidth: "100%" }}>
			<Group gap="lg" my="xs">
				<Switch
					label="Auto-play next timer"
					onLabel="ON"
					offLabel="OFF"
					size="md"
					checked={b.canAutoPlay}
					onChange={(event) =>
						setConfigValue("behavior.canAutoPlay", event.currentTarget.checked)
					}
				/>
			</Group>

			<Stack gap="md" mt="lg">
				<NumberInput
					label="Session adjust step (minutes)"
					size="xs"
					min={1}
					max={30}
					value={b.sessionAdjustStepMinutes ?? 5}
					onChange={(value) =>
						setConfigValue(
							"behavior.sessionAdjustStepMinutes",
							Math.min(30, Math.max(1, Number(value) || 5)),
						)
					}
				/>
			</Stack>
		</Box>
	);
};

export default BehaviorSettings;
