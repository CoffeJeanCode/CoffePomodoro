import { Mode } from "@/models";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";
import { FaCheck, FaForward, FaPause, FaPlay } from "react-icons/fa";
import styles from "./TimerControllers.module.css";
import { getModeHexColors } from "./utils/timer";

interface TimerControllersProps {
	mode: Mode;
	isPlaying: boolean;
	handleToggleTimer: () => void;
	onSkipBreak?: () => void;
	onIntentionFulfilled?: () => void;
}

const TimerControllers: FC<TimerControllersProps> = ({
	mode,
	isPlaying,
	handleToggleTimer,
	onSkipBreak,
	onIntentionFulfilled,
}) => {
	const color = getModeHexColors(mode).btnMain;
	const onBreak = mode !== Mode.Pomodoro;

	if (onBreak) {
		return (
			<Group className={styles.controls}>
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
				<Tooltip label="Skip break (N)" withArrow>
					<ActionIcon
						className={styles.skipButton}
						size={44}
						radius="xl"
						variant="light"
						color={color}
						onClick={onSkipBreak}
						aria-label="Skip break"
					>
						<FaForward size={16} />
					</ActionIcon>
				</Tooltip>
			</Group>
		);
	}

	return (
		<Group className={styles.controls}>
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
			<Tooltip label="Mark intention as fulfilled (S)" withArrow>
				<ActionIcon
					className={styles.skipButton}
					size={44}
					radius="xl"
					variant="light"
					color="gray"
					onClick={onIntentionFulfilled}
					aria-label="Intention Fulfilled"
				>
					<FaCheck size={16} />
				</ActionIcon>
			</Tooltip>
		</Group>
	);
};

export default memo(TimerControllers);
