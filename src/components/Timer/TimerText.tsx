import { Text, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";
import styles from "./TimerText.module.css";

interface TimerTextProps {
	remainingTimeText: string;
	sessionProgressPercent: number;
}

const TimerText: FC<TimerTextProps> = ({
	remainingTimeText: _remainingTimeText,
	sessionProgressPercent,
}) => {
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
			<Text className={styles.progressLabel} c="white">
				{progressLabel}
			</Text>
		</Tooltip>
	);
};

export default memo(TimerText);
