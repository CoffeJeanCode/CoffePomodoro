import { Mode } from "@/models";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useInfoState } from "@/stores";
import { Box, Container } from "@mantine/core";
import { memo, useEffect, useRef, useState } from "react";
import BreakRestScreen from "./BreakRestScreen";
import SessionComplete from "./SessionComplete";
import SessionIntention from "./SessionIntention";
import TimerControllers from "./TimerControllers";
import TimerHeader from "./TimerHeader";
import TimerProgressRing from "./TimerProgressRing";
import TimerViewControls from "./TimerViewControls";
import usePictureInPicture from "./hooks/usePictureInPicture";
import useTimer from "./hooks/useTimer";
import { useTimerDocumentAndHotkeys } from "./hooks/useTimerDocumentAndHotkeys";
import { useTimerFullscreen } from "./hooks/useTimerFullscreen";
import styles from "./styles/Timer.module.css";
import {
	buildAmbientBackground,
	buildFullscreenBackground,
} from "./utils/ambientBackground";

const isBreakMode = (mode: Mode) =>
	mode === Mode.ShortBreak || mode === Mode.LongBreak;

const Timer = () => {
	const {
		acknowledgeCycleAndContinue,
		awaitingCycleAck,
		breakProgressPercent,
		dismissCycleAck,
		handleAdjustSessionByMinutes,
		handleNextTimer,
		handleStopTimer,
		handleSkipBreak,
		handleToggleTimer,
		finishTime,
		finishTimeText,
		isRunning,
		remainingTime,
		sessionAdjustStepMinutes,
		sessionProgressPercent,
		skipCountsSessionMinProgressPercent,
	} = useTimer();
	const { mode } = useInfoState();
	const timerRef = useRef<HTMLDivElement>(null);

	const [sessionIntention, setSessionIntention] = useState("");
	const [intentionConfirmed, setIntentionConfirmed] = useState(false);
	const [phaseOpacity, setPhaseOpacity] = useState(1);
	const prevModeRef = useRef(mode);

	useEffect(() => {
		if (prevModeRef.current === mode) return;

		setPhaseOpacity(0.25);
		const fadeIn = setTimeout(() => setPhaseOpacity(1), 2000);

		if (prevModeRef.current !== Mode.Pomodoro && mode === Mode.Pomodoro) {
			setIntentionConfirmed(false);
			setSessionIntention("");
		}

		prevModeRef.current = mode;
		return () => clearTimeout(fadeIn);
	}, [mode]);

	const needsIntention =
		mode === Mode.Pomodoro && !isRunning && !intentionConfirmed && !awaitingCycleAck;
	const abstractSession =
		mode === Mode.Pomodoro &&
		!awaitingCycleAck &&
		(isRunning || intentionConfirmed);
	const onBreak = isBreakMode(mode);

	const { isFullScreen, handleFullScreen } = useTimerFullscreen(timerRef);

	const progressPercent = onBreak
		? breakProgressPercent
		: sessionProgressPercent;

	const { handlePictureInPicture, isPiPOpen } = usePictureInPicture({
		handleToggleTimer,
		handleStopTimer,
		handleNextTimer,
		handleAdjustSessionByMinutes,
		sessionAdjustStepMinutes,
		skipCountsSessionMinProgressPercent,
		mode,
		sessionProgressPercent: progressPercent,
	});

	useTimerDocumentAndHotkeys({
		mode,
		handleToggleTimer,
		handleStopTimer,
		handleNextTimer,
		handleFullScreen,
		handlePictureInPicture,
		handleAdjustSessionByMinutes,
	});

	const handleConfirmIntention = (intention: string) => {
		setSessionIntention(intention);
		setIntentionConfirmed(true);
		handleToggleTimer();
	};

	const ambient = buildAmbientBackground(mode, progressPercent);
	const fullscreenBg = buildFullscreenBackground(mode, progressPercent);

	return (
		<Container px={0} fluid={isFullScreen} w={isFullScreen ? "100%" : undefined}>
			<Box ref={timerRef} w={isFullScreen ? "100%" : undefined}>
				<GlassPanel
					immersive={isFullScreen}
					ambientBackground={isFullScreen ? fullscreenBg : ambient}
					className={`${styles.timerSquare} ${onBreak ? styles.timerSquareBreak : ""} ${isFullScreen ? styles.timerFullscreen : ""}`}
					padding={isFullScreen ? "2rem 1.5rem" : "1rem 1.25rem"}
					innerClassName={styles.timerBody}
					style={{ opacity: phaseOpacity }}
				>
					{!awaitingCycleAck && !onBreak && (
						<Box className={styles.timerHeader}>
							<TimerHeader
								mode={mode}
								sessionAdjustStepMinutes={sessionAdjustStepMinutes}
								onAddMinute={() => handleAdjustSessionByMinutes(1)}
								onSubtractMinute={() => handleAdjustSessionByMinutes(-1)}
							/>
						</Box>
					)}

<Box
		className={`${styles.timerStage} ${needsIntention || awaitingCycleAck ? styles.timerStageIntention : ""} ${isFullScreen && onBreak ? styles.timerStageElevated : ""}`}
	>
		{onBreak ? (
			<BreakRestScreen
				mode={mode as Mode.ShortBreak | Mode.LongBreak}
				breakProgressPercent={breakProgressPercent}
				large={isFullScreen}
				onSkipBreak={handleSkipBreak}
			/>
						) : awaitingCycleAck ? null : (
							<TimerProgressRing
								mode={mode}
								sessionProgressPercent={sessionProgressPercent}
								isRunning={isRunning}
								large={isFullScreen && !needsIntention}
								abstractSession={abstractSession}
								finishTimeText={finishTimeText}
								finishTime={finishTime}
								remainingTimeSeconds={remainingTime}
								centerLabel={
									needsIntention ? "What will you focus on?" : undefined
								}
								sessionIntention={
									abstractSession ? sessionIntention : undefined
								}
							/>
						)}

						<Box className={styles.timerActions}>
							{needsIntention ? (
								<SessionIntention onConfirm={handleConfirmIntention} />
							) : awaitingCycleAck ? (
								<SessionComplete
									onContinue={acknowledgeCycleAndContinue}
									onEnd={() => {
										dismissCycleAck();
										setIntentionConfirmed(false);
										setSessionIntention("");
										handleStopTimer();
									}}
								/>
							) : (
								<TimerControllers
									mode={mode}
									handleStopTimer={handleStopTimer}
									handleToggleTimer={handleToggleTimer}
									isPlaying={isRunning}
									onSkipBreak={handleSkipBreak}
								/>
							)}
						</Box>
					</Box>

					<Box
						className={`${styles.timerFooter} ${isFullScreen ? styles.timerFullscreenFooter : ""}`}
					>
						<TimerViewControls
							mode={mode}
							handlePictureInPicture={handlePictureInPicture}
							handleFullScreen={handleFullScreen}
							isPiPOpen={isPiPOpen}
						/>
					</Box>
				</GlassPanel>
			</Box>
		</Container>
	);
};

export default memo(Timer);
