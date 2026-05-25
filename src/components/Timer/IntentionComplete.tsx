import brainDumpStyles from "@/components/BrainDump/BrainDump.module.css";
import type { BrainDumpNote } from "@/models/brainDump";
import { copyBrainDumpToClipboard } from "@/utils/brainDump.util";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { type FC, memo } from "react";
import styles from "./IntentionComplete.module.css";

interface IntentionCompleteProps {
	intention: string;
	savedMinutes: number;
	brainDumpNotes: BrainDumpNote[];
	onDiscardBrainDump: () => void;
	onConfirm: () => void;
	onCancel: () => void;
}

const IntentionComplete: FC<IntentionCompleteProps> = ({
	intention,
	savedMinutes,
	brainDumpNotes,
	onDiscardBrainDump,
	onConfirm,
	onCancel,
}) => {
	const hasNotes = brainDumpNotes.length > 0;

	const handleCopy = async () => {
		await copyBrainDumpToClipboard(brainDumpNotes);
	};

	return (
		<Stack gap="md" w="100%" maw={300} align="center">
			<Text size="sm" c="dimmed" ta="center" className={styles.caption}>
				Intention fulfilled
			</Text>
			<Text
				size="md"
				fw={500}
				c="white"
				ta="center"
				className={styles.intention}
			>
				"{intention}"
			</Text>
			{savedMinutes > 0 && (
				<Text size="sm" c="blue.4" ta="center">
					You earned {savedMinutes} min of extra break
				</Text>
			)}
			{hasNotes && (
				<Box w="100%">
					<Text size="xs" c="dimmed" ta="center" mb={6}>
						Captured thoughts
					</Text>
					<Box className={brainDumpStyles.triageList}>
						{brainDumpNotes.map((note) => (
							<Text
								key={note.id}
								size="xs"
								className={brainDumpStyles.noteItem}
							>
								{note.text}
							</Text>
						))}
					</Box>
					<Group gap="xs" grow mt="xs">
						<Button
							variant="light"
							color="gray"
							size="xs"
							onClick={onDiscardBrainDump}
						>
							Discard
						</Button>
						<Button
							variant="light"
							color="blue"
							size="xs"
							onClick={() => void handleCopy()}
						>
							Copy
						</Button>
					</Group>
				</Box>
			)}
			<Text size="xs" c="dimmed" ta="center">
				Confirm to close the cycle and move to break
			</Text>
			<Stack gap="xs" w="100%" mt="xs">
				<Button fullWidth color="red" variant="light" onClick={onConfirm}>
					Close cycle
				</Button>
				<Button fullWidth variant="subtle" color="gray" onClick={onCancel}>
					Stay focused
				</Button>
			</Stack>
		</Stack>
	);
};

export default memo(IntentionComplete);
