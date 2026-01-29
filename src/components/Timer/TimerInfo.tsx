import { useInfoState, useTimerState } from "@/stores";
import { Box, Text } from "@mantine/core";
import { type FC, memo } from "react";

const TimerInfo: FC = () => {
	const { sessions } = useInfoState();
	const { finishTimeText, isRunning } = useTimerState();

	return (
		<>
			<Text c="white" fw="700" size="xl">
				Session #{sessions}
			</Text>

			<Box
				style={{
					overflow: "hidden",
					maxHeight: isRunning ? "2.5rem" : 0,
					marginTop: isRunning ? 10 : 0,
					transition:
						"max-height 0.35s ease-in-out, margin-top 0.35s ease-in-out",
				}}
			>
				<Text
					c="white"
					fw="500"
					size="lg"
					style={{
						opacity: isRunning ? 1 : 0,
						transition: "opacity 0.3s ease-in-out",
					}}
				>
					Timer finish at {finishTimeText}
				</Text>
			</Box>
		</>
	);
};

export default memo(TimerInfo);
