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
	const minutesLeft = Math.ceil(sessionProgressPercent / 100 * 25);
	const progressLabel =
		sessionProgressPercent < 25
			? "Starting"
			: sessionProgressPercent < 50
				? "Flowing"
				: sessionProgressPercent < 75
					? "Deepening"
					: sessionProgressPercent < 95
						? "Winding down"
						: "Almost done";

	return (
		<Tooltip
			label={`${Math.round(sessionProgressPercent)}% complete`}
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
