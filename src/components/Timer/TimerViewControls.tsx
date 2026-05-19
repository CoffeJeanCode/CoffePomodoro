import type { Mode } from "@/models/info";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";
import { RiFullscreenFill, RiPictureInPictureFill } from "react-icons/ri";
import { getColorMode } from "./utils/timer";

interface TimerViewControlsProps {
	mode: Mode;
	handlePictureInPicture: () => void;
	handleFullScreen: () => void;
	isPiPOpen: boolean;
}

const TimerViewControls: FC<TimerViewControlsProps> = ({
	mode,
	handlePictureInPicture,
	handleFullScreen,
	isPiPOpen,
}) => {
	const base = getColorMode(mode);

	return (
		<Group gap="sm" justify="center" w="100%">
			<Tooltip label="Picture-in-Picture (Shift+I)" withArrow>
				<ActionIcon
					size="lg"
					variant="light"
					color={isPiPOpen ? base : "gray"}
					onClick={handlePictureInPicture}
					aria-label="Picture in picture"
				>
					<RiPictureInPictureFill size={18} />
				</ActionIcon>
			</Tooltip>
			<Tooltip label="Full screen (F)" withArrow>
				<ActionIcon
					size="lg"
					variant="light"
					color="gray"
					onClick={handleFullScreen}
					aria-label="Full screen"
				>
					<RiFullscreenFill size={18} />
				</ActionIcon>
			</Tooltip>
		</Group>
	);
};

export default memo(TimerViewControls);
