import { useInfoState, useShutdownState, useTimerState } from "@/stores";
import { useBrainDumpState } from "@/stores/states/brainDump";
import { useStatsState } from "@/stores/states/stats";
import { copyBrainDumpToClipboard } from "@/utils/brainDump.util";
import { getToday } from "@/utils/time.util";
import { Box, Button, Group, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { memo, useState } from "react";
import { FaCopy, FaMoon, FaRegTrashAlt } from "react-icons/fa";
import styles from "./Shutdown.module.css";

type Step = "triage" | "consolidate";

const Shutdown = () => {
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
					<Text className={styles.lockMessage}>
						Day complete. Your attention is free. See you tomorrow.
					</Text>
					<Text className={styles.lockSub}>
						Reload the app tomorrow to start fresh.
					</Text>
				</Box>
			</Box>
		);
	}

	return (
		<>
			<Tooltip label="End your workday" position="right" withArrow>
				<Button
					className={styles.trigger}
					variant="subtle"
					color="gray"
					size="compact-xs"
					leftSection={<FaMoon size={11} />}
					onClick={startSequence}
				>
					End day
				</Button>
			</Tooltip>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				closeOnClickOutside={false}
				centered
				radius="md"
				overlayProps={{ blur: 4, backgroundOpacity: 0.6 }}
				title={
					step === "triage" ? "Empty your mental inbox" : "Today's intentions"
				}
				styles={{ title: { fontWeight: 600 } }}
			>
				{step === "triage" ? (
					<Stack gap="md">
						<Text size="sm" c="dimmed">
							Process what you captured today. Export it wherever you keep it
							and clear the inbox to free your short-term memory.
						</Text>

						{inboxClean ? (
							<Text size="sm" c="dimmed" ta="center" py="md">
								The inbox is clear. Your mind is unloaded.
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
								Copy all
							</Button>
							<Button
								variant="light"
								color="red"
								leftSection={<FaRegTrashAlt size={13} />}
								disabled={inboxClean}
								onClick={discardAllBrainDump}
							>
								Clear inbox
							</Button>
						</Group>

						<Button
							fullWidth
							color="gray"
							disabled={!inboxClean}
							onClick={() => setStep("consolidate")}
						>
							Continue
						</Button>
					</Stack>
				) : (
					<Stack gap="md">
						<Text size="sm" c="dimmed">
							These are the intentions you gave your full attention today.
						</Text>

						{completedIntentions.length === 0 ? (
							<Text size="sm" c="dimmed" ta="center" py="md">
								You didn't mark any intentions complete today. You still deserve
								rest.
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
							What deserved your attention, received it. That's enough for
							today.
						</Text>

						<Button fullWidth color="gray" onClick={handleConfirmShutdown}>
							Power down and close the day
						</Button>
					</Stack>
				)}
			</Modal>
		</>
	);
};

export default memo(Shutdown);
