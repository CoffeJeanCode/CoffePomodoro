import { GlassPanel } from "@/components/ui/GlassPanel";
import { Mode } from "@/models";
import { useInfoState } from "@/stores";
import { useBrainDumpState } from "@/stores/states/brainDump";
import { secondsToMinutes } from "@/utils/time.util";
import { Box, Container } from "@mantine/core";
import { memo, useEffect, useRef, useState } from "react";
import BreakRestScreen from "./BreakRestScreen";
import IntentionComplete from "./IntentionComplete";
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
		awaitingIntentionFulfillment,
		breakProgressPercent,
		cancelIntentionFulfillment,
		confirmIntentionFulfillment,
		dismissCycleAck,
		handleAdjustSessionByMinutes,
		handleIntentionFulfilled,
		handleNextTimer,
		handleStopTimer,
		handleSkipBreak,
		handleToggleTimer,
		finishTime,
		finishTimeText,
		isRunning,
		remainingTime,
		savedTimeBonus,
		sessionAdjustStepMinutes,
		sessionProgressPercent,
	} = useTimer();
	const {
		mode,
		sessionIntention,
		intentionConfirmed,
		setSessionIntention,
		setIntentionConfirmed,
		clearSessionIntention,
	} = useInfoState();
	const brainDumpNotes = useBrainDumpState((s) => s.notes);
	const discardAllBrainDump = useBrainDumpState((s) => s.discardAll);
	const timerRef = useRef<HTMLDivElement>(null);

	const [isEditingIntention, setIsEditingIntention] = useState(false);
	const [phaseOpacity, setPhaseOpacity] = useState(1);
	const prevModeRef = useRef(mode);

	useEffect(() => {
		if (prevModeRef.current === mode) return;

		setPhaseOpacity(0.25);
		const fadeIn = setTimeout(() => setPhaseOpacity(1), 2000);

		prevModeRef.current = mode;
		return () => clearTimeout(fadeIn);
	}, [mode]);

	const needsIntention =
		mode === Mode.Pomodoro &&
		!isRunning &&
		!intentionConfirmed &&
		!awaitingCycleAck &&
		!awaitingIntentionFulfillment;
	const abstractSession =
		mode === Mode.Pomodoro &&
		!awaitingCycleAck &&
		!awaitingIntentionFulfillment &&
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
		mode,
		sessionProgressPercent: progressPercent,
	});

	useTimerDocumentAndHotkeys({
		mode,
		handleToggleTimer,
		handleStopTimer,
		handleIntentionFulfilled,
		handleNextTimer,
		handleFullScreen,
		handlePictureInPicture,
		handleAdjustSessionByMinutes,
	});

	const handleConfirmIntention = (intention: string) => {
		const isFirstIntention = !intentionConfirmed;
		setSessionIntention(intention);
		setIntentionConfirmed(true);
		setIsEditingIntention(false);
		if (isFirstIntention) handleToggleTimer();
	};

	const handleEditIntention = () => {
		if (!abstractSession || !intentionConfirmed) return;
		setIsEditingIntention(true);
	};

	const ambient = buildAmbientBackground(mode, progressPercent);
	const fullscreenBg = buildFullscreenBackground(mode, progressPercent);

	return (
		<Container
			px={0}
			fluid={isFullScreen}
			w={isFullScreen ? "100%" : undefined}
		>
			<Box ref={timerRef} w={isFullScreen ? "100%" : undefined}>
				<GlassPanel
					immersive={isFullScreen}
					ambientBackground={isFullScreen ? fullscreenBg : ambient}
					className={`${styles.timerSquare} ${onBreak ? styles.timerSquareBreak : ""} ${isFullScreen ? styles.timerFullscreen : ""}`}
					padding={isFullScreen ? "2rem 1.5rem" : "1rem 1.25rem"}
					innerClassName={styles.timerBody}
					style={{ opacity: phaseOpacity }}
				>
					{!awaitingCycleAck && !awaitingIntentionFulfillment && !onBreak && (
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
								savedTimeBonus={savedTimeBonus}
								isRunning={isRunning}
							/>
						) : awaitingCycleAck || awaitingIntentionFulfillment ? null : (
							<TimerProgressRing
								mode={mode}
								sessionProgressPercent={sessionProgressPercent}
								isRunning={isRunning}
								large={isFullScreen && !needsIntention}
								abstractSession={abstractSession}
								finishTimeText={finishTimeText}
								finishTime={finishTime}
								centerLabel={
									needsIntention ? "What will you focus on?" : undefined
								}
								sessionIntention={
									abstractSession && !isEditingIntention
										? sessionIntention
										: undefined
								}
								canEditIntention={
									abstractSession && intentionConfirmed && !isEditingIntention
								}
								onEditIntention={handleEditIntention}
							/>
						)}

						<Box
							className={`${styles.timerActions} ${isEditingIntention ? styles.timerActionsCentered : ""}`}
						>
							{needsIntention || isEditingIntention ? (
								<SessionIntention
									centered={isEditingIntention}
									key={isEditingIntention ? "edit" : "new"}
									initialValue={isEditingIntention ? sessionIntention : ""}
									submitLabel={isEditingIntention ? "Save" : "Begin focus"}
									onConfirm={handleConfirmIntention}
									onCancel={
										isEditingIntention
											? () => setIsEditingIntention(false)
											: undefined
									}
								/>
							) : awaitingCycleAck ? (
								<SessionComplete
									onContinue={acknowledgeCycleAndContinue}
									onEnd={() => {
										dismissCycleAck();
										clearSessionIntention();
										handleStopTimer();
									}}
								/>
							) : awaitingIntentionFulfillment ? (
								<IntentionComplete
									intention={sessionIntention}
									savedMinutes={Math.floor(secondsToMinutes(savedTimeBonus))}
									brainDumpNotes={brainDumpNotes}
									onDiscardBrainDump={discardAllBrainDump}
									onConfirm={() => {
										confirmIntentionFulfillment();
										clearSessionIntention();
									}}
									onCancel={() => {
										cancelIntentionFulfillment();
									}}
								/>
							) : (
								<TimerControllers
									mode={mode}
									handleToggleTimer={handleToggleTimer}
									isPlaying={isRunning}
									onSkipBreak={handleSkipBreak}
									onIntentionFulfilled={handleIntentionFulfilled}
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
							isFullScreen={isFullScreen}
						/>
					</Box>
				</GlassPanel>
			</Box>
		</Container>
	);
};

export default memo(Timer);
