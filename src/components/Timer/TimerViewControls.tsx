import type { Mode } from "@/models/info";
import { Button, Group, type MantineTheme } from "@mantine/core";
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
		<Group
			gap="sm"
			style={{
				width: "100%",
				justifyContent: "center",
			}}
		>
			<Button
				size="sm"
				variant="subtle"
				title="Picture-in-Picture (Shift+I)"
				color="gray.0"
				onClick={handlePictureInPicture}
				style={(theme: MantineTheme) =>
					isPiPOpen ? { backgroundColor: theme.colors[base][5] } : undefined
				}
			>
				<RiPictureInPictureFill size={18} />
			</Button>
			<Button
				size="sm"
				variant="subtle"
				title="Full Screen (F)"
				color="gray.0"
				onClick={handleFullScreen}
			>
				<RiFullscreenFill size={18} />
			</Button>
		</Group>
	);
};

export default memo(TimerViewControls);