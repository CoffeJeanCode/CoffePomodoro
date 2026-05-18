import { Button, Stack, Text } from "@mantine/core";
import { type FC, memo } from "react";

interface SessionCompleteProps {
	onContinue: () => void;
	onEnd: () => void;
}

const SessionComplete: FC<SessionCompleteProps> = ({ onContinue, onEnd }) => (
	<Stack gap="md" w="100%" maw={300} align="center">
		<Text size="lg" fw={500} c="white" ta="center">
			Focus block complete
		</Text>
		<Text size="sm" c="dimmed" ta="center">
			Take a breath. Continue when you are ready for a break, or end here.
		</Text>
		<Stack gap="xs" w="100%">
			<Button fullWidth color="red" variant="light" onClick={onContinue}>
				Continue to break
			</Button>
			<Button fullWidth variant="subtle" color="gray" onClick={onEnd}>
				End for now
			</Button>
		</Stack>
	</Stack>
);

export default memo(SessionComplete);
