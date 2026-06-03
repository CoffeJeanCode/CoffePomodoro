import { onboardingAnchorProps } from "@/components/Onboarding/anchors";
import { useInfoState, useShutdownState, useTimerState } from "@/stores";
import { useBrainDumpState } from "@/stores/states/brainDump";
import { useStatsState } from "@/stores/states/stats";
import { useLanguage } from "@/context/LanguageContext";
import { copyBrainDumpToClipboard } from "@/utils/brainDump.util";
import { getToday } from "@/utils/time.util";
import { Box, ActionIcon, Button, Group, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { memo, useState } from "react";
import { FaCopy, FaMoon, FaRegTrashAlt } from "react-icons/fa";
import styles from "./Shutdown.module.css";

type Step = "triage" | "consolidate";

const Shutdown = () => {
	const { t } = useLanguage();
	const isShutDown = useShutdownState((s) => s.isShutDown);
	const shutDown = useShutdownState((s) => s.shutDown);

	const notes = useBrainDumpState((s) => s.notes);
	const discardAllBrainDump = useBrainDumpState((s) => s.discardAll);

	const completedIntentions = useInfoState((s) => s.completedIntentions);
	const resetDailyProgress = useInfoState((s) => s.resetDailyProgress);
	const today = useInfoState((s) => s.date.raw);
	const resetDailyStats = useStatsState((s) => s.resetDailyStats);
	const setIsRunning = useTimerState((s) => s.setIsRunning);

	const [opened, setOpened] = useState(false);
	const [step, setStep] = useState<Step>("triage");

	const startSequence = () => {
		setIsRunning(false);
		setStep("triage");
		setOpened(true);
	};

	const handleConfirmShutdown = () => {
		resetDailyStats(getToday(today));
		resetDailyProgress();
		shutDown();
		setOpened(false);
	};

	const handleCopy = () => {
		void copyBrainDumpToClipboard(notes);
	};

	const inboxClean = notes.length === 0;

	if (isShutDown) {
		return (
			<Box className={styles.lockOverlay}>
				<Box>
					<Text className={styles.lockMessage}>{t.shutdown.lockMessage}</Text>
					<Text className={styles.lockSub}>{t.shutdown.lockSub}</Text>
				</Box>
			</Box>
		);
	}

	return (
		<>
			<Tooltip label={t.shutdown.endDayTooltip} position="right" withArrow openDelay={400}>
				<ActionIcon
					className={styles.trigger}
					variant="transparent"
					size="xl"
					radius="xl"
					aria-label={t.shutdown.endDayTooltip}
					onClick={startSequence}
					{...onboardingAnchorProps("endDay")}
				>
					<FaMoon size={18} />
				</ActionIcon>
			</Tooltip>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				closeOnClickOutside={false}
				centered
				radius="md"
				overlayProps={{ blur: 4, backgroundOpacity: 0.6 }}
				title={
					step === "triage"
						? t.shutdown.triageTitle
						: t.shutdown.consolidateTitle
				}
				styles={{ title: { fontWeight: 600 } }}
			>
				{step === "triage" ? (
					<Stack gap="md">
						<Text size="sm" c="dimmed">
							{t.shutdown.triageBody}
						</Text>

						{inboxClean ? (
							<Text size="sm" c="dimmed" ta="center" py="md">
								{t.shutdown.inboxClear}
							</Text>
						) : (
							<Box className={styles.list}>
								{notes.map((note) => (
									<Text key={note.id} className={styles.noteItem}>
										{note.text}
									</Text>
								))}
							</Box>
						)}

						<Group grow gap="sm">
							<Button
								variant="light"
								color="gray"
								leftSection={<FaCopy size={13} />}
								disabled={inboxClean}
								onClick={handleCopy}
							>
								{t.shutdown.copyAll}
							</Button>
							<Button
								variant="light"
								color="red"
								leftSection={<FaRegTrashAlt size={13} />}
								disabled={inboxClean}
								onClick={discardAllBrainDump}
							>
								{t.shutdown.clearInbox}
							</Button>
						</Group>

						<Button
							fullWidth
							color="gray"
							disabled={!inboxClean}
							onClick={() => setStep("consolidate")}
						>
							{t.shutdown.continue}
						</Button>
					</Stack>
				) : (
					<Stack gap="md">
						<Text size="sm" c="dimmed">
							{t.shutdown.consolidateBody}
						</Text>

						{completedIntentions.length === 0 ? (
							<Text size="sm" c="dimmed" ta="center" py="md">
								{t.shutdown.noIntentions}
							</Text>
						) : (
							<Box className={styles.list}>
								{completedIntentions.map((intention) => (
									<Text key={intention} className={styles.intentionItem}>
										"{intention}"
									</Text>
								))}
							</Box>
						)}

						<Text size="sm" c="dimmed" ta="center">
							{t.shutdown.consolidateClosing}
						</Text>

						<Button fullWidth color="gray" onClick={handleConfirmShutdown}>
							{t.shutdown.powerDown}
						</Button>
					</Stack>
				)}
			</Modal>
		</>
	);
};

export default memo(Shutdown);
