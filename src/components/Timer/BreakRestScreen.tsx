import RotatingTip from "@/components/ui/RotatingTip";
import { Mode } from "@/models";
import { getModeTitle } from "@/utils/modeLabels";
import { secondsToMinutes } from "@/utils/time.util";
import { Box, Button, Collapse, Stack, Text, Title } from "@mantine/core";
import { type FC, memo, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import styles from "./BreakRestScreen.module.css";
import BreathingCircle from "./BreathingCircle";

const SHORT_BREAK_SUGGESTIONS = [
	"Look away from the screen",
	"Stretch your body",
	"Drink some water",
	"Take three deep breaths",
];

interface BreakRestScreenProps {
	mode: Mode.ShortBreak | Mode.LongBreak;
	breakProgressPercent: number;
	large?: boolean;
	savedTimeBonus?: number;
	isRunning?: boolean;
	onSkip?: () => void;
}

const BreakRestScreen: FC<BreakRestScreenProps> = ({
	mode,
	large = false,
	savedTimeBonus = 0,
	isRunning = true,
	onSkip,
}) => {
	const isLong = mode === Mode.LongBreak;
	const title = getModeTitle(mode);
	const [showTips, setShowTips] = useState(false);
	const bonusMinutes = secondsToMinutes(savedTimeBonus);

	const wrapClass = `${styles.wrap} ${large ? styles.wrapLarge : ""}`;

	if (isLong) {
		return (
			<Box className={wrapClass}>
				<Stack gap={large ? "xl" : "lg"} align="center" py={large ? "md" : "xs"}>
					<Title
						order={large ? 2 : 4}
						c="dimmed"
						fw={400}
						ta="center"
						className={styles.title}
					>
						{title}
					</Title>
					<BreathingCircle large={large} isAnimating={isRunning} slow />
					{bonusMinutes > 0 && (
						<Text size="xs" c="dimmed" ta="center" className={styles.bonus}>
							+{bonusMinutes} min
						</Text>
					)}
					{onSkip && (
						<Button
							variant="subtle"
							color="gray"
							size="compact-xs"
							className={styles.skip}
							onClick={onSkip}
						>
							End rest
						</Button>
					)}
				</Stack>
			</Box>
		);
	}

	return (
		<Box className={wrapClass}>
			<Stack gap={large ? "lg" : "sm"} align="center" py={large ? "md" : "xs"}>
				<Title
					order={large ? 2 : 4}
					c="white"
					fw={500}
					ta="center"
					className={styles.title}
				>
					{title}
				</Title>
				<Text
					size={large ? "md" : "sm"}
					c="dimmed"
					ta="center"
					className={styles.subtitle}
				>
					No clock — just rest.
				</Text>
				{bonusMinutes > 0 && (
					<Text size="xs" c="blue.4" ta="center" className={styles.bonus}>
						Extended break +{bonusMinutes} min for early completion
					</Text>
				)}
				<BreathingCircle large={large} isAnimating={isRunning} />
				<Text size="xs" c="dimmed" ta="center" className={styles.hint}>
					Breathe · Release · Recover
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
					<RotatingTip tips={SHORT_BREAK_SUGGESTIONS} />
				</Collapse>
			</Stack>
		</Box>
	);
};

export default memo(BreakRestScreen);
