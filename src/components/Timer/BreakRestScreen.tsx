import RotatingTip from "@/components/ui/RotatingTip";
import { useLanguage } from "@/context/LanguageContext";
import { formatMessage } from "@/locales/formatMessage";
import { Mode } from "@/models";
import { getModeTitle } from "@/utils/modeLabels";
import { secondsToMinutes } from "@/utils/time.util";
import { Box, Button, Collapse, Stack, Text, Title } from "@mantine/core";
import { type FC, memo, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import styles from "./BreakRestScreen.module.css";
import BreathingCircle from "./BreathingCircle";

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
	const { t, lang } = useLanguage();
	const isLong = mode === Mode.LongBreak;
	const title = getModeTitle(mode, lang);
	const [showTips, setShowTips] = useState(false);
	const bonusMinutes = secondsToMinutes(savedTimeBonus);
	const shortTips = t.breakSuggestions.short;

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
							{t.break.endRest}
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
					{t.break.shortRest}
				</Text>
				{bonusMinutes > 0 && (
					<Text size="xs" c="blue.4" ta="center" className={styles.bonus}>
						{formatMessage(t.break.extendedBreak, {
							minutes: bonusMinutes,
						})}
					</Text>
				)}
				<BreathingCircle large={large} isAnimating={isRunning} />
				<Text size="xs" c="dimmed" ta="center" className={styles.hint}>
					{t.break.quickRest}
				</Text>
				<Button
					variant="subtle"
					color="gray"
					size={large ? "sm" : "xs"}
					leftSection={<FaLightbulb size={14} />}
					onClick={() => setShowTips((open) => !open)}
					aria-expanded={showTips}
				>
					{showTips ? t.break.hideSuggestions : t.break.showSuggestions}
				</Button>
				<Collapse in={showTips} w="100%">
					<RotatingTip tips={[...shortTips]} />
				</Collapse>
			</Stack>
		</Box>
	);
};

export default memo(BreakRestScreen);
