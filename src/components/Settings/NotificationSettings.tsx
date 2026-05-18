import type { TimerSchema } from "@/models/schemas";
import {
	Box,
	Button,
	Group,
	Select,
	Slider,
	Stack,
	Switch,
	Text,
} from "@mantine/core";

import { keys } from "ramda";
import type { FC } from "react";
import { FaBell } from "react-icons/fa";
import useSound from "use-sound";
import type { Configuration } from "../../models";
import { ALARMS } from "../../stores/constants";

type AlarmTitle = keyof typeof ALARMS;

interface Props {
	configuration: Configuration | TimerSchema;
	// biome-ignore lint: romelint/suspicious/noExplicitAny
	setConfigValue: (path: string, value: any) => void;
}

const NotificationSettings: FC<Props> = ({ configuration, setConfigValue }) => {
	const [playNotification] = useSound(configuration.notification.alarm.url, {
		volume: configuration.notification.volume,
	});

	return (
		<Stack gap="md" style={{ maxWidth: "100%" }}>
			<Group align="flex-end" wrap="nowrap" gap="sm">
				<Button
					onClick={() => playNotification()}
					aria-label="Preview alarm"
					flex="0 0 auto"
				>
					<FaBell />
				</Button>
				<Box style={{ flex: 1, minWidth: 0 }}>
				<Select
					label="Alarm"
					w="100%"
					value={configuration.notification.alarm.title}
					data={keys(ALARMS)}
					onChange={(title) => {
						setConfigValue(
							"notification.alarm",
							ALARMS[title as AlarmTitle],
						);
					}}
				/>
				</Box>
			</Group>

			<Box w="100%">
				<Text size="sm" fw={500} mb={4}>
					Volume
				</Text>
				<Slider
					min={0.1}
					max={1}
					step={0.1}
					label={(value) => `${value * 100}%`}
					value={configuration.notification.volume}
					onChange={(value) => setConfigValue("notification.volume", value)}
				/>
			</Box>

			<Switch
				label="Desktop notifications"
				onLabel="ON"
				offLabel="OFF"
				size="md"
				checked={configuration.notification.desktopNotification}
				onChange={(evt) => {
					const {
						target: { checked },
					} = evt;
					setConfigValue("notification.desktopNotification", checked);
					if (checked)
						Notification.requestPermission().then((perm) => {
							if (perm === "granted")
								setConfigValue("notification.desktopNotification", true);
							else setConfigValue("notification.desktopNotification", false);
						});
				}}
			/>
		</Stack>
	);
};

export default NotificationSettings;
