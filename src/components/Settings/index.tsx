import { Button, Container, Drawer, ScrollArea, Title } from "@mantine/core";
import { memo, useState } from "react";

import { FaWrench } from "react-icons/fa";
import { useConfiguration } from "../../hooks/useConfiguracion";
import BehaviurSettings from "./BehaviurSettings";
import NotificationSettings from "./NotificationSettings";
import SchemaSettings from "./SchemaSettings";
import TimerSettings from "./TimerSettings";

const Settings = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { config, setConfigValue, isSettingsChanged, saveConfiguration } = useConfiguration();

	return (
		<>
			<Button leftIcon={<FaWrench />} onClick={() => setIsOpen(true)}>
				Settings
			</Button>

			<Drawer
				opened={isOpen}
				position="left"
				onClose={() => setIsOpen(false)}
				scrollAreaComponent={ScrollArea.Autosize}
				mah={"90vh"}
			>
				<Container>
					<Title order={2} size={35}>
						Settings
					</Title>
					<SchemaSettings configuration={config} setConfigValue={setConfigValue} />
					<TimerSettings configuration={config} setConfigValue={setConfigValue} />
					<BehaviurSettings configuration={config} setConfigValue={setConfigValue} />
					<NotificationSettings configuration={config} setConfigValue={setConfigValue} />

					{isSettingsChanged && <Button onClick={() => saveConfiguration()}>Save Changes</Button>}
				</Container>
			</Drawer>
		</>
	);
};

export default memo(Settings);
