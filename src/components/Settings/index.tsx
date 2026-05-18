import { type ConfigurationState, useConfigState } from "@/stores";
import { SCHEMA_KEYS } from "@/stores/constants";
import { useSchemasState } from "@/stores/states/schema";
import { AppDrawer } from "@/components/ui/AppDrawer";
import { AppToolbarButton } from "@/components/ui/AppToolbarButton";
import { DRAWER_LEFT_TRANSITION } from "@/theme/uiTokens";
import ui from "@/styles/ui.module.css";
import {
	Box,
	Button,
	Divider,
	Flex,
	Stack,
	Tabs,
	Text,
} from "@mantine/core";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";
import { memo, useState } from "react";
import { FaWrench } from "react-icons/fa";
import { useConfiguration } from "../../hooks/useConfiguracion";
import BehaviorSettings from "./BehaviorSettings";
import NotificationSettings from "./NotificationSettings";
import SchemaSettings from "./SchemaSettings";
import TimerSettings from "./TimerSettings";

const Settings = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<string | null>("timer");
	const {
		schemas,
		currentSchemaId,
		setCurrentSchema,
		updateCurrentSchema,
		findCurrentSchema,
	} = useSchemasState();
	const {
		config: configState,
		setConfiguration,
		resetConfiguration,
	} = useConfigState();
	const currentSchema = findCurrentSchema();
	const isSchemaSelected = currentSchemaId !== "";
	const currentConfig = isSchemaSelected
		? {
				config: currentSchema,
				setConfiguration: updateCurrentSchema,
				resetConfiguration: resetConfiguration,
			}
		: {
				config: configState,
				setConfiguration: setConfiguration,
				resetConfiguration: resetConfiguration,
			};

	const {
		config,
		isSettingsChanged,
		setConfigValue,
		saveConfiguration,
		cancelConfiguration,
	} = useConfiguration(currentConfig as ConfigurationState);

	const handleSaveChangesSettings = () => saveConfiguration();
	const handleCancelChangesSettings = () => cancelConfiguration();

	useHotkeys([["ctrl+,", () => setIsOpen((prev) => !prev)]]);

	return (
		<>
			<AppToolbarButton
				leftSection={<FaWrench />}
				onClick={() => setIsOpen(true)}
			>
				Settings
			</AppToolbarButton>

			<AppDrawer
				opened={isOpen}
				position="left"
				size="md"
				title="Settings"
				onClose={() => setIsOpen(false)}
				transitionProps={DRAWER_LEFT_TRANSITION}
			styles={{
				content: {
					overflow: "hidden",
					borderLeft: "none",
					borderRight: "1px solid var(--ui-glass-border)",
				},
				body: {
					overflow: "hidden auto",
					maxWidth: "100%",
				},
			}}
				onKeyDown={getHotkeyHandler([
					["shift+k+s", handleSaveChangesSettings, { preventDefault: true }],
					["shift+k+c", handleCancelChangesSettings, { preventDefault: true }],
					...(schemas.map((schema, idx) => [
						`shift+${SCHEMA_KEYS[idx]}`,
						() => {
							setCurrentSchema(schema.id === currentSchemaId ? "" : schema.id);
						},
						// biome-ignore lint: romelint/suspicious/noExplicitAny
					]) as any),
				])}
			>
				<Flex
					direction="column"
					gap="md"
					pb={isSettingsChanged ? 80 : 0}
					style={{ minWidth: 0, maxWidth: "100%" }}
				>
					{isSchemaSelected && currentSchema && (
						<Text size="sm" c="dimmed">
							Editing preset: <strong>{currentSchema.title}</strong>
						</Text>
					)}

					<Tabs
						value={activeTab}
						onChange={setActiveTab}
						keepMounted={false}
						style={{ maxWidth: "100%" }}
					>
						<Tabs.List grow>
							<Tabs.Tab value="timer">Timer</Tabs.Tab>
							<Tabs.Tab value="behavior">Behavior</Tabs.Tab>
							<Tabs.Tab value="notifications">Notifications</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value="timer" pt="md">
							<Stack gap="lg">
								<SchemaSettings
									configuration={config}
									setConfigValue={setConfigValue}
								/>
								<Divider opacity={0.2} />
								<TimerSettings
									configuration={config}
									setConfigValue={setConfigValue}
								/>
							</Stack>
						</Tabs.Panel>
						<Tabs.Panel value="behavior" pt="md">
							<BehaviorSettings
								configuration={config}
								setConfigValue={setConfigValue}
							/>
						</Tabs.Panel>
						<Tabs.Panel value="notifications" pt="md">
							<NotificationSettings
								configuration={config}
								setConfigValue={setConfigValue}
							/>
						</Tabs.Panel>
					</Tabs>
				</Flex>

				{isSettingsChanged && (
					<Box
						pos="absolute"
						bottom={0}
						left={0}
						right={0}
						p="md"
						className={ui.glassInset}
						style={{
							borderRadius: 0,
							borderLeft: "none",
							borderRight: "none",
							borderBottom: "none",
						}}
					>
						<Flex justify="flex-end" gap="sm">
							<Button
								variant="subtle"
								color="gray"
								onClick={handleCancelChangesSettings}
							>
								Discard
							</Button>
							<Button color="red" variant="light" onClick={handleSaveChangesSettings}>
								Save changes
							</Button>
						</Flex>
					</Box>
				)}
			</AppDrawer>
		</>
	);
};

export default memo(Settings);
