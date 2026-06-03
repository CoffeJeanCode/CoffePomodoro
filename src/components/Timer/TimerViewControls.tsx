import { useLanguage } from "@/context/LanguageContext";
import type { Mode } from "@/models/info";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { type FC, memo } from "react";
import {
	RiFullscreenExitFill,
	RiFullscreenFill,
	RiPictureInPicture2Fill,
	RiPictureInPictureFill,
} from "react-icons/ri";
import { getColorMode } from "./utils/timer";

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
	const base = getColorMode(mode);
	const { t } = useLanguage();

	return (
		<Group gap="sm" justify="center" w="100%">
			<Tooltip
				label={isPiPOpen ? t.controls.pipOpen : t.controls.pipClosed}
				withArrow
			>
				<ActionIcon
					size="lg"
					variant="light"
					color={isPiPOpen ? base : "gray"}
					onClick={handlePictureInPicture}
					aria-label={t.controls.pipAria}
				>
					{isPiPOpen ? (
						<RiPictureInPicture2Fill size={18} />
					) : (
						<RiPictureInPictureFill size={18} />
					)}
				</ActionIcon>
			</Tooltip>
			<Tooltip
				label={
					isFullScreen ? t.controls.fullscreenExit : t.controls.fullscreenEnter
				}
				withArrow
			>
				<ActionIcon
					size="lg"
					variant="light"
					color={isFullScreen ? base : "gray"}
					onClick={handleFullScreen}
					aria-label={t.controls.fullscreenAria}
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
