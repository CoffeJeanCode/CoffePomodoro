import {
	onboardingAnchorProps,
	useOnboardingAnchorDismiss,
} from "@/components/Onboarding/anchors";
import { AppDrawer } from "@/components/ui/AppDrawer";
import { AppToolbarButton } from "@/components/ui/AppToolbarButton";
import { useLanguage } from "@/context/LanguageContext";
import { type ConfigurationState, useConfigState } from "@/stores";
import { SCHEMA_KEYS } from "@/stores/constants";
import { useSchemasState } from "@/stores/states/schema";
import ui from "@/styles/ui.module.css";
import { DRAWER_LEFT_TRANSITION } from "@/theme/uiTokens";
import {
	Box,
	Button,
	Divider,
	Flex,
	SegmentedControl,
	Stack,
	Tabs,
	Text,
} from "@mantine/core";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";
import { memo, useCallback, useState } from "react";
import { FaWrench } from "react-icons/fa";
import { useConfiguration } from "../../hooks/useConfiguracion";
import DataSettings from "./DataSettings";
import NotificationSettings from "./NotificationSettings";
import SchemaSettings from "./SchemaSettings";
import styles from "./SettingsLayout.module.css";
import TimerSettings from "./TimerSettings";

const Settings = () => {
	const { t, lang, setLanguage } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<string | null>("timer");
	useOnboardingAnchorDismiss(useCallback(() => setIsOpen(false), []));
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
				{...onboardingAnchorProps("settings")}
			>
				{t.settings.button}
			</AppToolbarButton>

			<AppDrawer
				opened={isOpen}
				position="left"
				size="md"
				title={t.settings.title}
				onClose={() => setIsOpen(false)}
				transitionProps={DRAWER_LEFT_TRANSITION}
				styles={{
					content: {
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
						borderLeft: "none",
						borderRight: "1px solid var(--ui-glass-border)",
					},
					body: {
						maxWidth: "100%",
						display: "flex",
						flexDirection: "column",
						flex: 1,
						overflow: "hidden",
						paddingBottom: 0,
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
					]) as any),
				])}
			>
				<Flex className={styles.contentArea} direction="column" gap="md">
					{isSchemaSelected && currentSchema && (
						<Text size="sm" c="dimmed">
							{t.settings.editingPreset}{" "}
							<strong>{currentSchema.title}</strong>
						</Text>
					)}

					<Tabs
						value={activeTab}
						onChange={setActiveTab}
						keepMounted={false}
						className={styles.tabs}
					>
						<Tabs.List grow>
							<Tabs.Tab value="timer">{t.settings.tabs.timer}</Tabs.Tab>
							<Tabs.Tab value="notifications">
								{t.settings.tabs.notifications}
							</Tabs.Tab>
							<Tabs.Tab value="data">{t.settings.tabs.data}</Tabs.Tab>
							<Tabs.Tab value="language">{t.settings.tabs.language}</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value="timer" pt="md">
							<Stack gap="lg">
								<SchemaSettings
									configuration={config}
									setConfigValue={setConfigValue}
								/>
								<Divider opacity={0.2} />
								<Box>
									<Text size="xs" fw={500} mb={4}>
										{t.settings.visualMode.label}
									</Text>
									<SegmentedControl
										fullWidth
										size="xs"
										value={config.visualMode}
										onChange={(value) =>
											setConfigValue("visualMode", value)
										}
										data={[
											{
												label: t.settings.visualMode.ripples,
												value: "ripples",
											},
											{
												label: t.settings.visualMode.stardust,
												value: "stardust",
											},
											{ label: t.settings.visualMode.enso, value: "enso" },
										]}
									/>
								</Box>
								<Divider opacity={0.2} />
								<TimerSettings
									configuration={config}
									setConfigValue={setConfigValue}
								/>
							</Stack>
						</Tabs.Panel>

						<Tabs.Panel value="notifications" pt="md">
							<NotificationSettings
								configuration={config}
								setConfigValue={setConfigValue}
							/>
						</Tabs.Panel>

						<Tabs.Panel value="data" pt="md">
							<DataSettings />
						</Tabs.Panel>

						<Tabs.Panel value="language" pt="md">
							<Stack gap="sm">
								<Text size="xs" fw={500}>
									{t.settings.language.label}
								</Text>
								<SegmentedControl
									fullWidth
									size="xs"
									value={lang}
									onChange={(value) => setLanguage(value as "en" | "es")}
									data={[
										{ label: t.settings.language.en, value: "en" },
										{ label: t.settings.language.es, value: "es" },
									]}
								/>
							</Stack>
						</Tabs.Panel>
					</Tabs>
				</Flex>

				{isSettingsChanged && (
					<Box p="md" className={`${ui.glassInset} ${styles.saveBar}`}>
						<Flex justify="flex-end" gap="sm">
							<Button
								variant="subtle"
								color="gray"
								onClick={handleCancelChangesSettings}
							>
								{t.settings.discard}
							</Button>
							<Button
								color="red"
								variant="light"
								onClick={handleSaveChangesSettings}
							>
								{t.settings.save}
							</Button>
						</Flex>
					</Box>
				)}
			</AppDrawer>
		</>
	);
};

export default memo(Settings);
