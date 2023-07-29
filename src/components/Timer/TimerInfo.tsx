import { useInfoState, useTimerState } from "@/stores";
import { Text, Title } from "@mantine/core";
import { FC, memo } from "react";

const TimerInfo: FC = () => {
	const { sessions } = useInfoState();
	const { finishTimeText, isRunning } = useTimerState();

	return (
		<>
			<Text color="white">Session #{sessions}</Text>
			{isRunning && (
				<Title order={5} size="h5" my={10} color="white">
					Timer finish at {finishTimeText}
				</Title>
			)}
		</>
	);
};

export default memo(TimerInfo);
