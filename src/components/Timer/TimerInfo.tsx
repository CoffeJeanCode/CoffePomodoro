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

			<Text size="md" fw="500" my={10} c={isRunning ? "white" : (mode === Mode.Pomodoro ? "pink.2" : "green.2")}>
				Timer finish at {finishTimeText}
			</Text>
		</>
	);
};

export default memo(TimerInfo);
