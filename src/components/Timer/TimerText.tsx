import { useLanguage } from "@/context/LanguageContext";
import { formatMessage } from "@/locales/formatMessage";
import { Text, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";

interface TimerTextProps {
	remainingTimeText: string;
	sessionProgressPercent: number;
}

const TimerText: FC<TimerTextProps> = ({
	remainingTimeText: _remainingTimeText,
	sessionProgressPercent,
}) => {
	const { t } = useLanguage();
	const minutesLeft = Math.ceil((sessionProgressPercent / 100) * 25);
	const progressLabel =
		sessionProgressPercent < 25
			? t.timer.progress.starting
			: sessionProgressPercent < 50
				? t.timer.progress.flowing
				: sessionProgressPercent < 75
					? t.timer.progress.deepening
					: sessionProgressPercent < 95
						? t.timer.progress.windingDown
						: t.timer.progress.almostDone;

	return (
		<Tooltip
			label={formatMessage(t.timer.progress.complete, {
				percent: Math.round(sessionProgressPercent),
			})}
			position="bottom"
			withArrow
			openDelay={800}
		>
			<Text
				style={{
					display: "inline-block",
					cursor: "default",
					lineHeight: 1.2,
					opacity: 0.7,
					fontSize: "1.1rem",
					letterSpacing: "0.1em",
					textTransform: "lowercase",
				}}
				c="white"
			>
				{progressLabel}
			</Text>
		</Tooltip>
	);
};

export default memo(TimerText);
