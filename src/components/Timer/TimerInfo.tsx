import { Mode } from "@/models";
import { useInfoState, useTimerState } from "@/stores";
import { Text, Title } from "@mantine/core";
import { type FC, memo } from "react";

const TimerInfo: FC = () => {
	const { sessions, mode } = useInfoState();
	const { finishTimeText, isRunning } = useTimerState();

	return (
		<>
			<Text c="white" fw="700" size="xl">
				Session #{sessions}
			</Text>

			<Text c="white" fw="500" size="lg" my={10} opacity={isRunning ? 1 : 0} style={{ transition: "opacity 0.2s ease-in" }}>
				Timer finish at {finishTimeText}
			</Text>
		</>
	);
};

export default memo(TimerInfo);
