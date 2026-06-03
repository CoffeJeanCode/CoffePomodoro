import { useLanguage } from "@/context/LanguageContext";
import { Mode } from "@/models";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";
import { FaCheck, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { getColorMode } from "./utils/timer";

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
	const { t } = useLanguage();
	const color = getColorMode(mode);
	const onBreak = mode !== Mode.Pomodoro;

	if (onBreak) {
		return (
			<Group gap="lg" justify="center">
				<Tooltip
					label={isPlaying ? t.timer.control.pause : t.timer.control.play}
					withArrow
				>
					<ActionIcon
						size={56}
						radius="xl"
						variant="light"
						color={color}
						onClick={handleToggleTimer}
						aria-label={
							isPlaying ? t.timer.control.pause : t.timer.control.play
						}
					>
						{isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
					</ActionIcon>
				</Tooltip>
				<Tooltip label={t.timer.control.skipBreak} withArrow>
					<ActionIcon
						size={44}
						radius="xl"
						variant="light"
						color={color}
						onClick={onSkipBreak}
						aria-label={t.timer.control.skipBreakLabel}
						style={{ opacity: 0.85 }}
					>
						<FaForward size={16} />
					</ActionIcon>
				</Tooltip>
			</Group>
		);
	}

	return (
		<Group gap="lg" justify="center">
			<Tooltip
				label={isPlaying ? t.timer.control.pause : t.timer.control.play}
				withArrow
			>
				<ActionIcon
					size={56}
					radius="xl"
					variant="light"
					color={color}
					onClick={handleToggleTimer}
					aria-label={isPlaying ? t.timer.control.pause : t.timer.control.play}
				>
					{isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
				</ActionIcon>
			</Tooltip>
			<Tooltip label={t.timer.control.intentionFulfilled} withArrow>
				<ActionIcon
					size={44}
					radius="xl"
					variant="light"
					color="gray"
					onClick={onIntentionFulfilled}
					aria-label={t.timer.control.intentionFulfilledLabel}
					style={{ opacity: 0.85 }}
				>
					<FaCheck size={16} />
				</ActionIcon>
			</Tooltip>
		</Group>
	);
};

export default memo(TimerControllers);
