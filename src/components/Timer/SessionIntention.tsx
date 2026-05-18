import { Button, Stack, Textarea } from "@mantine/core";
import { type FC, memo, useState } from "react";

interface SessionIntentionProps {
	onConfirm: (intention: string) => void;
}

const SessionIntention: FC<SessionIntentionProps> = ({ onConfirm }) => {
	const [value, setValue] = useState("");

	return (
		<Stack gap="xs" w="100%" maw={260}>
			<Textarea
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				placeholder="One clear intention…"
				minRows={1}
				maxRows={2}
				autosize
				radius="md"
				size="sm"
				autoFocus
				onKeyDown={(e) => {
					if (e.key !== "Enter" || e.shiftKey) return;
					const trimmed = value.trim();
					if (!trimmed) return;
					e.preventDefault();
					onConfirm(trimmed);
				}}
			/>
			<Button
				fullWidth
				color="red"
				variant="light"
				size="sm"
				disabled={!value.trim()}
				onClick={() => onConfirm(value.trim())}
			>
				Begin focus
			</Button>
		</Stack>
	);
};

export default memo(SessionIntention);
