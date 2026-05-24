import type { Mode } from "@/models/info";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";
import {
	RiFullscreenExitFill,
	RiFullscreenFill,
	RiPictureInPicture2Fill,
	RiPictureInPictureFill,
} from "react-icons/ri";
import { getModeHexColors } from "./utils/timer";

interface TimerViewControlsProps {
	mode: Mode;
	handlePictureInPicture: () => void;
	handleFullScreen: () => void;
	isPiPOpen: boolean;
	isFullScreen: boolean;
}

const TimerViewControls: FC<TimerViewControlsProps> = ({
	mode,
	handlePictureInPicture,
	handleFullScreen,
	isPiPOpen,
	isFullScreen,
}) => {
	const base = getModeHexColors(mode).btnMain;

	return (
		<Group gap="sm" justify="center" w="100%">
			<Tooltip
				label={
					isPiPOpen
						? "Close Picture-in-Picture (Shift+I)"
						: "Picture-in-Picture (Shift+I)"
				}
				withArrow
			>
				<ActionIcon
					size="lg"
					variant="light"
					color={isPiPOpen ? base : "gray"}
					onClick={handlePictureInPicture}
					aria-label="Picture in picture"
				>
					{isPiPOpen ? (
						<RiPictureInPicture2Fill size={18} />
					) : (
						<RiPictureInPictureFill size={18} />
					)}
				</ActionIcon>
			</Tooltip>
			<Tooltip
				label={isFullScreen ? "Exit full screen (F)" : "Full screen (F)"}
				withArrow
			>
				<ActionIcon
					size="lg"
					variant="light"
					color={isFullScreen ? base : "gray"}
					onClick={handleFullScreen}
					aria-label="Full screen"
				>
					{isFullScreen ? (
						<RiFullscreenExitFill size={18} />
					) : (
						<RiFullscreenFill size={18} />
					)}
				</ActionIcon>
			</Tooltip>
		</Group>
	);
};

export default memo(TimerViewControls);
