import { Mode } from "@/models";
import { useInfoState, useTimerState } from "@/stores";
import { Text } from "@mantine/core";
import { type FC, memo } from "react";

interface TimerInfoProps {
	sessionIntention?: string;
}

/** Shows focus intention only — no session counters or finish-time pressure. */
const TimerInfo: FC<TimerInfoProps> = ({ sessionIntention }) => {
	const { mode } = useInfoState();
	const { isRunning } = useTimerState();

	if (mode !== Mode.Pomodoro || !isRunning || !sessionIntention?.trim()) {
		return null;
	}

	return (
		<Text
			c="white"
			size="sm"
			ta="center"
			fs="italic"
			style={{ opacity: 0.75, maxWidth: 320, margin: "0 auto" }}
		>
			{sessionIntention}
		</Text>
	);
};

export default memo(TimerInfo);
