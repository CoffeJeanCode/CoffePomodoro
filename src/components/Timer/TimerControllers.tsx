import { Mode } from "@/models";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";
import { FaForward, FaPause, FaPlay, FaStop } from "react-icons/fa";
import { getColorMode } from "./utils/timer";

interface TimerControllersProps {
	mode: Mode;
	isPlaying: boolean;
	handleToggleTimer: () => void;
	handleStopTimer: () => void;
	onSkipBreak?: () => void;
}

const TimerControllers: FC<TimerControllersProps> = ({
	mode,
	isPlaying,
	handleToggleTimer,
	handleStopTimer,
	onSkipBreak,
}) => {
	const color = getColorMode(mode);
	const onBreak = mode !== Mode.Pomodoro;

	return (
		<Group gap="lg" justify="center">
			<Tooltip label={isPlaying ? "Pause" : "Start"} withArrow>
				<ActionIcon
					size={56}
					radius="xl"
					variant="light"
					color={color}
					onClick={handleToggleTimer}
					aria-label={isPlaying ? "Pause" : "Start"}
				>
					{isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
				</ActionIcon>
			</Tooltip>
			<Tooltip
				label={onBreak ? "Skip break (N)" : "End session"}
				withArrow
			>
				<ActionIcon
					size={44}
					radius="xl"
					variant="light"
					color={onBreak ? color : "gray"}
					onClick={onBreak ? (onSkipBreak ?? handleStopTimer) : handleStopTimer}
					aria-label={onBreak ? "Skip break" : "End session"}
					style={{ opacity: 0.85 }}
				>
					{onBreak ? <FaForward size={16} /> : <FaStop size={16} />}
				</ActionIcon>
			</Tooltip>
		</Group>
	);
};

export default memo(TimerControllers);
