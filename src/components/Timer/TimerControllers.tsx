import { Mode } from "@/models";
import { Button, Group } from "@mantine/core";
import { FC, memo } from "react";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";

interface TimerControllersProps {
	mode: string;
	isPlaying: boolean;
	handleToggleTimer: Function;
	handleNextTimer: Function;
	handleStopTimer: Function;
}

const TimerControllers: FC<TimerControllersProps> = ({
	mode,
	isPlaying,
	handleToggleTimer,
	handleNextTimer,
	handleStopTimer,
}) => {
	const color = mode === Mode.Pomodoro ? "red.9" : "green.9";

	const playButtonProps = {
		leftIcon: isPlaying ? <FaPause /> : <FaPlay />,
		title: isPlaying ? "Pause <Space>" : "Play <Space>",
		color,
		onClick: () => handleToggleTimer(),
	};

	const skipButtonProps = {
		leftIcon: <FaStepForward />,
		color,
		title: "Skip <N>",
		onClick: () => handleNextTimer(true),
	};

	const pauseButtonProps = {
		leftIcon: <FaPause />,
		title: "Pause <Space>",
		color,
		onClick: () => handleToggleTimer(),
	};

	const stopButtonProps = {
		leftIcon: <FaStop />,
		title: "Stop <S>",
		color,
		onClick: () => handleStopTimer(),
	};

	return (
		<Group my={10}>
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
