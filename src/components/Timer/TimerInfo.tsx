import { useInfoState, useTimerState } from "@/stores";
import { Box, Text } from "@mantine/core";
import { type FC, memo } from "react";

const TimerInfo: FC = () => {
	const { sessions } = useInfoState();
	const { finishTimeText, isRunning } = useTimerState();

	return (
		<Box style={{ width: "100%", textAlign: "center" }}>
			<Text c="white" fw="700" size="xl" ta="center">
				Session #: {sessions}
			</Text>

			<Box
				style={{
					overflow: "hidden",
					maxHeight: isRunning ? "2.5rem" : 0,
					marginTop: isRunning ? 10 : 0,
					transition:
						"max-height 0.35s ease-in-out, margin-top 0.35s ease-in-out",
					textAlign: "center",
				}}
			>
				<Text
					c="white"
					fw="500"
					size="lg"
					ta="center"
					style={{
						opacity: isRunning ? 1 : 0,
						transition: "opacity 0.3s ease-in-out",
					}}
				>
					Finish at {finishTimeText}
				</Text>
			</Box>
		</Box>
	);
};

export default memo(TimerInfo);
