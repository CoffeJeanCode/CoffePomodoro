import { FavIcon, Mode } from "@/models/info";
import { useInfoState } from "@/stores";
import { Box, Button, Center, Container, Group, Sx } from "@mantine/core";
import { useDocumentTitle, useFavicon, useHotkeys } from "@mantine/hooks";
import { memo, useEffect, useMemo, useState } from "react";
import { RiFullscreenFill } from "react-icons/ri";
import TimerControllers from "./TimerControllers";
import TimerInfo from "./TimerInfo";
import TimerMode from "./TimerMode";
import TimerText from "./TimerText";
import useTimer from "./useTimer";

const Timer = () => {
	const { handleNextTimer, handleStopTimer, handleToggleTimer, isRunning, remainingTimeText } = useTimer();
	const { mode, favIcon, setFavIcon } = useInfoState();
	const [isFullScreen, setIsFullScreen] = useState(false);

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
	]);

	const handleFullScreen = () => setIsFullScreen(!isFullScreen);

	const fullScreenStyle: Sx = useMemo(
		() =>
			isFullScreen
				? {
						width: "100vw",
						height: "100vh",
						position: "absolute",
						top: 0,
						left: 0,
						display: "grid",
						placeItems: "center",
				  }
				: {},
		[isFullScreen],
	);
	return (
		<Container>
			<Box
				sx={(theme) => ({
					...fullScreenStyle,
					minWidth: "30vw",
					background: mode === Mode.Pomodoro ? theme.colors.red[8] : theme.colors.green[8],
					padding: theme.spacing.md,
					borderRadius: theme.spacing.md,
					transition: "all .7s ease",
				})}
			>
				<Center sx={{ flexDirection: "column" }}>
					<Group>
						<TimerMode />
						<Button size="xs" color={mode === Mode.Pomodoro ? "red.8" : "green.8"} onClick={handleFullScreen}>
							<RiFullscreenFill />
						</Button>
					</Group>
					<TimerText />
					<TimerControllers
						mode={mode}
						handleNextTimer={handleNextTimer}
						handleStopTimer={handleStopTimer}
						handleToggleTimer={handleToggleTimer}
						isPlaying={isRunning}
					/>
					<TimerInfo />
				</Center>
			</Box>
		</Container>
	);
};

export default memo(Timer);
