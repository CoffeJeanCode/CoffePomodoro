import { useTimerState } from "@/stores";
import { Title } from "@mantine/core";
import { FC, memo } from "react";

const TimerText: FC = () => {
	const timerText = useTimerState((timer) => timer.remainingTimeText);
	return (
		<Title order={3} size={120} sx={{ userSelect: "none" }} color="white">
			{timerText}
		</Title>
	);
};

export default memo(TimerText);
