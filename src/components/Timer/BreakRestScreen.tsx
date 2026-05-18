import { Mode } from "@/models";
import RotatingTip from "@/components/ui/RotatingTip";
import { getModeTitle } from "@/utils/modeLabels";
import ui from "@/styles/ui.module.css";
import { Box, Button, Collapse, Stack, Text, Title } from "@mantine/core";
import { type FC, memo, useState } from "react";
import { FaForward, FaLightbulb } from "react-icons/fa";
import BreathingCircle from "./BreathingCircle";

const SHORT_BREAK_SUGGESTIONS = [
	"Take a short walk",
	"Look out the window",
	"Stretch your shoulders",
	"Drink some water",
];

const LONG_BREAK_SUGGESTIONS = [
	"Step away from the screen",
	"Close your eyes for a minute",
	"Do nothing for a while",
	"Light movement or fresh air",
];

interface BreakRestScreenProps {
	mode: Mode.ShortBreak | Mode.LongBreak;
	breakProgressPercent: number;
	large?: boolean;
	onSkipBreak: () => void;
}

const BreakRestScreen: FC<BreakRestScreenProps> = ({
	mode,
	breakProgressPercent,
	large = false,
	onSkipBreak,
}) => {
	const isLong = mode === Mode.LongBreak;
	const suggestions = isLong ? LONG_BREAK_SUGGESTIONS : SHORT_BREAK_SUGGESTIONS;
	const title = getModeTitle(mode);
	const deepRestOpacity = isLong
		? Math.min(0.75, (breakProgressPercent / 100) * 0.75)
		: 0;
	const [showTips, setShowTips] = useState(false);

	return (
		<Box pos="relative" w="100%" style={{ maxWidth: large ? 400 : 280 }}>
			{isLong && (
				<Box
					className={ui.deepRestOverlay}
					style={{ opacity: deepRestOpacity }}
					aria-hidden
				/>
			)}
			<Stack
				gap={large ? "lg" : "sm"}
				align="center"
				py={large ? "md" : "xs"}
				className={ui.breakContent}
			>
				<Title
					order={large ? 2 : 4}
					c="white"
					fw={500}
					ta="center"
					style={{ letterSpacing: "0.05em" }}
				>
					{title}
				</Title>
				<Text
					size={large ? "md" : "sm"}
					c="dimmed"
					ta="center"
					style={{ maxWidth: 320, opacity: 0.7 }}
				>
					{isLong
						? "Let the screen dim. Rest without watching the clock."
						: "No clock — just rest."}
				</Text>
				<BreathingCircle large={large} />
				<Button
					variant="light"
					color={isLong ? "blue" : "green"}
					size={large ? "sm" : "xs"}
					leftSection={<FaForward size={14} />}
					onClick={onSkipBreak}
				>
					Skip break
				</Button>
				<Button
					variant="subtle"
					color="gray"
					size={large ? "sm" : "xs"}
					leftSection={<FaLightbulb size={14} />}
					onClick={() => setShowTips((open) => !open)}
					aria-expanded={showTips}
				>
					{showTips ? "Hide tips" : "Show tips"}
				</Button>
				<Collapse in={showTips} w="100%">
					<RotatingTip tips={suggestions} />
				</Collapse>
			</Stack>
		</Box>
	);
};

export default memo(BreakRestScreen);
