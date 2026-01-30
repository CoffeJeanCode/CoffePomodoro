import { FavIcon, Mode } from "@/models/info";
import { useInfoState } from "@/stores";
import { getColorMode } from "./utils/timer";
import {
	Box,
	Center,
	Container,
	Stack,
	type MantineStyleProp,
	type MantineTheme,
} from "@mantine/core";
import { useDocumentTitle, useFavicon, useHotkeys } from "@mantine/hooks";
import { memo, useEffect, useMemo, useState } from "react";
import TimerControllers from "./TimerControllers";
import TimerInfo from "./TimerInfo";
import TimerMode from "./TimerMode";
import TimerText from "./TimerText";
import usePictureInPicture from "./hooks/usePictureInPicture";
import useTimer from "./hooks/useTimer";
import TimerViewControls from "./TimerViewControls";

const Timer = () => {
	const {
		handleNextTimer,
		handleStopTimer,
		handleToggleTimer,
		isRunning,
		remainingTimeText,
	} = useTimer();
	const { mode, favIcon, setFavIcon } = useInfoState();
	const [isFullScreen, setIsFullScreen] = useState(false);

	const { handlePictureInPicture, isPiPOpen } = usePictureInPicture({
		handleToggleTimer,
		handleStopTimer,
		handleNextTimer,
	});

	useEffect(() => {
		setFavIcon(mode === Mode.Pomodoro ? FavIcon.work : FavIcon.break);
	}, [mode]);

	useFavicon(favIcon);
	useDocumentTitle(`${remainingTimeText} | ${mode.toLocaleUpperCase()}`);
	useHotkeys([
		["Space", () => handleToggleTimer()],
		["S", () => handleStopTimer()],
		["N", () => handleNextTimer({ isSkip: true })],
		["F", () => handleFullScreen()],
		["shift+I", () => handlePictureInPicture()],
	]);

	const handleFullScreen = async () => {
		const fullScreen = !isFullScreen;

		if (fullScreen && !document.fullscreenElement)
			document.documentElement.requestFullscreen();
		else if (document.exitFullscreen) document.exitFullscreen();

		setIsFullScreen(fullScreen);
	};

	const fullScreenStyle: MantineStyleProp = useMemo(
		() =>
			isFullScreen
				? {
					width: "100vw",
					height: "100vh",
					borderRadius: 0,
					position: "absolute",
					top: 0,
					left: 0,
					display: "grid",
					placeItems: "center",
					zIndex: 2,
				}
				: {},
		[isFullScreen],
	);
	return (
		<Container px={0}>
			<Box
				style={(theme: MantineTheme) => {
					const base = getColorMode(mode);
					return {
						minWidth: "min(300, 30vw)",
						background: theme.colors[base][8],
						padding: `${theme.spacing.lg} calc(${theme.spacing.xl} * 2)`,
						borderRadius: theme.spacing.md,
						transition: "all 500ms ease-in-out",
						...fullScreenStyle,
					};
				}}
			>
				<Center style={{ flexDirection: "column" }}>
					<Stack gap="md" style={{ width: "100%", alignItems: "center" }}>
						<TimerMode />
						<TimerText />
						<TimerControllers
							mode={mode}
							handleNextTimer={handleNextTimer}
							handleStopTimer={handleStopTimer}
							handleToggleTimer={handleToggleTimer}
							isPlaying={isRunning}
						/>
						<TimerInfo />
						<TimerViewControls
							mode={mode}
							handlePictureInPicture={handlePictureInPicture}
							handleFullScreen={handleFullScreen}
							isPiPOpen={isPiPOpen}
						/>
					</Stack>
				</Center>
			</Box>
		</Container>
	);
};

export default memo(Timer);
