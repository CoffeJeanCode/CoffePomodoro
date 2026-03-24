import { Mode } from "@/models";
import { Button, Group } from "@mantine/core";
import { type FC, memo } from "react";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";
import { getColorModeKey } from "./utils/timer";
import { getSkipButtonTitle, getTimerControlState } from "./utils/timerControls";

interface TimerControllersProps {
	mode: Mode;
	isPlaying: boolean;
	skipCountsSessionMinProgressPercent: number;
	handleToggleTimer: () => void;
	handleNextTimer: ({ isSkip }: { isSkip: boolean }) => void;
	handleStopTimer: () => void;
}

const TimerControllers: FC<TimerControllersProps> = ({
	mode,
	isPlaying,
	skipCountsSessionMinProgressPercent,
	handleToggleTimer,
	handleNextTimer,
	handleStopTimer,
}) => {
	const color = getColorModeKey(mode, 9);
	const { isPaused, showSkip } = getTimerControlState(mode, isPlaying);

	const playButtonProps = {
		leftSection: isPlaying ? <FaPause /> : <FaPlay />,
		title: isPlaying ? "Pause <Space>" : "Play <Space>",
		color,
		onClick: () => handleToggleTimer(),
	};

	const skipButtonProps = {
		leftSection: <FaStepForward />,
		color,
		title: getSkipButtonTitle(mode, skipCountsSessionMinProgressPercent),
		onClick: () => handleNextTimer({ isSkip: true }),
	};

	const pauseButtonProps = {
		leftSection: <FaPause />,
		title: "Pause <Space>",
		color,
		onClick: () => handleToggleTimer(),
	};

	const stopButtonProps = {
		leftSection: <FaStop />,
		title: "Stop <S>",
		color,
		onClick: () => handleStopTimer(),
	};

	return (
		<Group gap="sm">
			{isPaused ? (
				<>
					<Button {...playButtonProps}>Play</Button>
					<Button {...skipButtonProps}>Skip</Button>
				</>
			) : (
				<>
					<Button {...pauseButtonProps}>Pause</Button>
					{showSkip ? (
						<Button {...skipButtonProps}>Skip</Button>
					) : (
						<Button {...stopButtonProps}>Stop</Button>
					)}
				</>
			)}
		</Group>
	);
};

export default memo(TimerControllers);
