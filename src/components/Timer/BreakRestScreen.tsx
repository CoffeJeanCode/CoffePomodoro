import RotatingTip from "@/components/ui/RotatingTip";
import { Mode } from "@/models";
import ui from "@/styles/ui.module.css";
import { getModeTitle } from "@/utils/modeLabels";
import { secondsToMinutes } from "@/utils/time.util";
import { Box, Button, Collapse, Stack, Text, Title } from "@mantine/core";
import { type FC, memo, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import BreathingCircle from "./BreathingCircle";
import { getModeHexColors } from "./utils/timer";

const SHORT_BREAK_SUGGESTIONS = [
	"Look away from the screen",
	"Stretch your body",
	"Drink some water",
	"Take three deep breaths",
];

const LONG_BREAK_SUGGESTIONS = [
	"Step away from the screen",
	"Close your eyes for a moment",
	"Do nothing for a while",
	"Gentle movement or fresh air",
];

interface BreakRestScreenProps {
	mode: Mode.ShortBreak | Mode.LongBreak;
	breakProgressPercent: number;
	large?: boolean;
	savedTimeBonus?: number;
	isRunning?: boolean;
}

const BreakRestScreen: FC<BreakRestScreenProps> = ({
	mode,
	breakProgressPercent,
	large = false,
	savedTimeBonus = 0,
	isRunning = true,
}) => {
	const isLong = mode === Mode.LongBreak;
	const suggestions = isLong ? LONG_BREAK_SUGGESTIONS : SHORT_BREAK_SUGGESTIONS;
	const title = getModeTitle(mode);
	const deepRestOpacity = isLong
		? Math.min(0.75, (breakProgressPercent / 100) * 0.75)
		: 0;
	const [showTips, setShowTips] = useState(false);
	const bonusMinutes = secondsToMinutes(savedTimeBonus);
	const accent = getModeHexColors(mode).btnMain;

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
					fw={500}
					ta="center"
					style={{ letterSpacing: "0.05em", color: "var(--ui-text)" }}
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
						? "Let the screen fade. Rest without watching the clock."
						: "No clock — just rest."}
				</Text>
				{bonusMinutes > 0 && (
					<Text
						size="xs"
						ta="center"
						style={{ opacity: 0.8, color: "var(--ui-accent-info)" }}
					>
						Extended break +{bonusMinutes} min for early completion
					</Text>
				)}
				<BreathingCircle
					large={large}
					isAnimating={isRunning}
					accent={accent}
				/>
				<Text
					size="xs"
					c="dimmed"
					ta="center"
					style={{ opacity: 0.45, maxWidth: 240, lineHeight: 1.5 }}
				>
					{isLong
						? "Look away · Stretch · Do nothing"
						: "Breathe · Release · Recover"}
				</Text>
				<Button
					variant="subtle"
					color="gray"
					size={large ? "sm" : "xs"}
					leftSection={<FaLightbulb size={14} />}
					onClick={() => setShowTips((open) => !open)}
					aria-expanded={showTips}
				>
					{showTips ? "Hide suggestions" : "Show suggestions"}
				</Button>
				<Collapse in={showTips} w="100%">
					<RotatingTip tips={suggestions} />
				</Collapse>
			</Stack>
		</Box>
	);
};

export default memo(BreakRestScreen);
