import { useLanguage } from "@/context/LanguageContext";
import { Button, Stack, Text } from "@mantine/core";
import { type FC, memo } from "react";

interface SessionCompleteProps {
	onContinue: () => void;
	onEnd: () => void;
}

const SessionComplete: FC<SessionCompleteProps> = ({ onContinue, onEnd }) => {
	const { t } = useLanguage();

	return (
		<Stack gap="md" w="100%" maw={300} align="center">
			<Text size="sm" c="orange.5" ta="center" fw={500}>
				{t.timer.fatigue.cycleReached}
			</Text>
			<Stack gap="xs" w="100%">
				<Button fullWidth color="red" variant="light" onClick={onContinue}>
					{t.timer.complete.continueToBreak}
				</Button>
				<Button fullWidth variant="subtle" color="gray" onClick={onEnd}>
					{t.timer.complete.endForNow}
				</Button>
			</Stack>
		</Stack>
	);
};

export default memo(SessionComplete);
