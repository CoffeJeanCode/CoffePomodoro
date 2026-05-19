import { useBrainDumpState } from "@/stores/states/brainDump";
import { ActionIcon, Box, Button, Text, Textarea } from "@mantine/core";
import { type FC, type KeyboardEvent, memo, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./BrainDump.module.css";

interface BrainDumpPanelProps {
	opened: boolean;
	onClose: () => void;
}

const BrainDumpPanel: FC<BrainDumpPanelProps> = ({ opened, onClose }) => {
	const [draft, setDraft] = useState("");
	const notes = useBrainDumpState((s) => s.notes);
	const addNote = useBrainDumpState((s) => s.addNote);
	const discardNote = useBrainDumpState((s) => s.discardNote);
	const autoPurge = useBrainDumpState((s) => s.autoPurge);

	useEffect(() => {
		if (opened) autoPurge();
	}, [opened, autoPurge]);

	const addCurrentLine = () => {
		if (!draft.trim()) return;
		addNote(draft);
		setDraft("");
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Escape") {
			e.preventDefault();
			setDraft("");
			onClose();
			return;
		}
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			addCurrentLine();
		}
	};

	return (
		<Box className={styles.notepad}>
			<Box className={styles.notepadHeader}>
				<Text className={styles.notepadTitle}>Scratch pad</Text>
				<ActionIcon
					variant="subtle"
					color="gray"
					size="sm"
					aria-label="Close scratch pad"
					onClick={() => {
						setDraft("");
						onClose();
					}}
				>
					<FaTimes size={12} />
				</ActionIcon>
			</Box>
			<Box className={styles.notepadBody}>
				<Textarea
					className={styles.writeArea}
					value={draft}
					onChange={(e) => setDraft(e.currentTarget.value)}
					placeholder="Jot it down…"
					minRows={3}
					maxRows={6}
					autosize
					autoFocus={opened}
					onKeyDown={handleKeyDown}
				/>
				{notes.length > 0 && (
					<Box className={styles.notesList}>
						{notes.map((note) => (
							<Box key={note.id} className={styles.noteItem}>
								<Text span className={styles.noteText}>
									{note.text}
								</Text>
								<Button
									variant="subtle"
									color="gray"
									size="xs"
									px={4}
									onClick={() => discardNote(note.id)}
								>
									×
								</Button>
							</Box>
						))}
					</Box>
				)}
				<Text className={styles.notepadHint}>
					Enter to save · Shift+Enter for new line · Esc to close
				</Text>
			</Box>
		</Box>
	);
};

export default memo(BrainDumpPanel);
