import brainDumpStyles from "@/components/BrainDump/BrainDump.module.css";
import { useLanguage } from "@/context/LanguageContext";
import type { BrainDumpNote } from "@/models/brainDump";
import { copyBrainDumpToClipboard } from "@/utils/brainDump.util";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { type FC, memo } from "react";

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
	const { t } = useLanguage();
	const hasNotes = brainDumpNotes.length > 0;

	const handleCopy = async () => {
		await copyBrainDumpToClipboard(brainDumpNotes);
	};

	return (
		<Stack gap="md" w="100%" maw={300} align="center">
			<Text
				size="sm"
				c="dimmed"
				ta="center"
				style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
			>
				{t.timer.intentionComplete.fulfilled}
			</Text>
			<Text
				size="md"
				fw={500}
				c="white"
				ta="center"
				style={{ fontStyle: "italic" }}
			>
				"{intention}"
			</Text>
			{savedMinutes > 0 && (
				<Text size="sm" c="blue.4" ta="center">
					{t.timer.intentionComplete.efficiencyBonus.replace(
						"{{minutes}}",
						String(savedMinutes),
					)}
				</Text>
			)}
			{hasNotes && (
				<Box w="100%">
					<Text size="xs" c="dimmed" ta="center" mb={6}>
						{t.timer.intentionComplete.capturedThoughts}
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
							{t.timer.intentionComplete.discard}
						</Button>
						<Button
							variant="light"
							color="blue"
							size="xs"
							onClick={() => void handleCopy()}
						>
							{t.timer.intentionComplete.copy}
						</Button>
					</Group>
				</Box>
			)}
			<Text size="xs" c="dimmed" ta="center">
				{t.timer.intentionComplete.confirmToClose}
			</Text>
			<Stack gap="xs" w="100%" mt="xs">
				<Button fullWidth color="red" variant="light" onClick={onConfirm}>
					{t.timer.intentionComplete.closeCycle}
				</Button>
				<Button fullWidth variant="subtle" color="gray" onClick={onCancel}>
					{t.timer.intentionComplete.stayFocused}
				</Button>
			</Stack>
		</Stack>
	);
};

export default memo(IntentionComplete);
