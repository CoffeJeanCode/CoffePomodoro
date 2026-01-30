import { Mode } from "@/models";
import { Button, Group } from "@mantine/core";
import { type FC, memo } from "react";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";
import { getColorModeKey } from "./utils/timer";

interface TimerControllersProps {
	mode: Mode;
	isPlaying: boolean;
	handleToggleTimer: () => void;
	handleNextTimer: ({ isSkip }: { isSkip: boolean }) => void;
	handleStopTimer: () => void;
}

const TimerControllers: FC<TimerControllersProps> = ({
	mode,
	isPlaying,
	handleToggleTimer,
	handleNextTimer,
	handleStopTimer,
}) => {
	const color = getColorModeKey(mode, 9);

	const playButtonProps = {
		leftSection: isPlaying ? <FaPause /> : <FaPlay />,
		title: isPlaying ? "Pause <Space>" : "Play <Space>",
		color,
		onClick: () => handleToggleTimer(),
	};

	const skipButtonProps = {
		leftSection: <FaStepForward />,
		color,
		title: "Skip <N>",
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
			{!isPlaying ? (
				<>
					<Button {...playButtonProps}>Play</Button>
					<Button {...skipButtonProps}>Skip</Button>
				</>
			) : (
				<>
					<Button {...pauseButtonProps}>Pause</Button>
					{mode === Mode.ShortBreak || mode === Mode.LongBreak ? (
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
