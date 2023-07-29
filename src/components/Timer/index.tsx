import { FavIcon, Mode } from "@/models/info";
import { useInfoState } from "@/stores";
import { Box, Center, Container } from "@mantine/core";
import { useDocumentTitle, useFavicon, useHotkeys } from "@mantine/hooks";
import { memo, useEffect } from "react";
import TimerControllers from "./TimerControllers";
import TimerInfo from "./TimerInfo";
import TimerMode from "./TimerMode";
import TimerText from "./TimerText";
import useTimer from "./useTimer";

const Timer = () => {
	const { handleNextTimer, handleStopTimer, handleToggleTimer, isRunning, remainingTime } = useTimer();
	const { mode, favIcon, setFavIcon } = useInfoState();

	useEffect(() => {
		setFavIcon(mode === Mode.Pomodoro ? FavIcon.work : FavIcon.break);
	}, [mode]);

	useFavicon(favIcon);
	useDocumentTitle(`${remainingTime}`);
	useHotkeys([
		["Space", () => handleToggleTimer()],
		["S", () => handleStopTimer()],
		["N", () => handleNextTimer({ isSkip: true })],
	]);

	return (
		<Container>
			<Box
				sx={(theme) => ({
					minWidth: "30vw",
					background: mode === Mode.Pomodoro ? theme.colors.red[7] : theme.colors.green[7],
					padding: theme.spacing.md,
					borderRadius: theme.spacing.md,
					transition: "background .7s ease",
				})}
			>
				<Center sx={{ flexDirection: "column" }}>
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
				</Center>
			</Box>
		</Container>
	);
};

export default memo(Timer);
