import { Mode } from "@/models";
import { DEPTH_PRESETS } from "@/models/depth";
import {
	useConfigState,
	useDepthState,
	useInfoState,
	useStatsState,
	useTimerState,
} from "@/stores";
import { useSchemasState } from "@/stores";
import { cyclesForTimers } from "@/utils/cycles";
import { getModeTitle } from "@/utils/modeLabels";
import { showNotification } from "@/utils/notification.utils";
import { getToday, secondsToMilliseconds } from "@/utils/time.util";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSound from "use-sound";
import { useTimerTick } from "./useTimerTick";

const useTimer = () => {
	const { activePreset } = useDepthState();
	const { currentSchemaId, findCurrentSchema } = useSchemasState();
	const config = useConfigState((state) => state.config);
	const {
		date,
		mode,
		pomodoros,
		sessions,
		sessionIntention,
		setMode,
		setPomodoros,
		setSessions,
		incrementHighIntensity,
		resetHighIntensity,
		logCompletedIntention,
	} = useInfoState();
	const {
		remainingTime,
		remainingTimeText,
		finishTime,
		finishTimeText,
		isRunning,
		resumedTime,
		sessionSegmentTotalSeconds,
		savedTimeBonus,
		setIsRunning,
		setFinishTime,
		setResumedTime,
		setRemainingTime,
		setSessionSegmentTotalSeconds,
		setSavedTimeBonus,
	} = useTimerState();
	const updateDailyStats = useStatsState((stats) => stats.updateDailyStats);
	const updateStreak = useStatsState((stats) => stats.updateStreak);
	const [awaitingCycleAck, setAwaitingCycleAck] = useState(false);
	const [awaitingIntentionFulfillment, setAwaitingIntentionFulfillment] =
		useState(false);

	const depthPreset = DEPTH_PRESETS[activePreset];
	const currentSchema = currentSchemaId !== "" ? findCurrentSchema() : null;
	const { timers } = currentSchema ?? depthPreset;
	const cycleLimit: number = cyclesForTimers(timers);

	const notification = config.notification;

	const recordPomodoroSessionStats = useCallback(
		(isCompleted: boolean) => {
			const elapsedTime = sessionSegmentTotalSeconds - remainingTime;
			setSessions(sessions + 1);
			updateDailyStats(
				getToday(date.raw),
				{
					sessions: 1,
					time: elapsedTime,
					completed: isCompleted ? 1 : 0,
					skipped: isCompleted ? 0 : 1,
					avgDuration: elapsedTime,
				},
				isCompleted,
			);
			updateStreak(date.formated);
			if (isCompleted) {
				incrementHighIntensity();
				logCompletedIntention(sessionIntention);
			}
		},
		[
			sessionSegmentTotalSeconds,
			remainingTime,
			sessions,
			setSessions,
			updateDailyStats,
			date.raw,
			date.formated,
			updateStreak,
			incrementHighIntensity,
			logCompletedIntention,
			sessionIntention,
		],
	);

	const [playNotification] = useSound(notification.alarm.url, {
		volume: notification.volume,
		soundEnabled: true,
	});

	const playSound = useCallback(() => {
		if (notification.volume <= 0) return;
		const isSoundscape =
			(notification.alarm as { type?: string }).type === "soundscape";
		if (isSoundscape) {
			const audio = new Audio(notification.alarm.url);
			audio.volume = 0;
			audio.loop = true;
			void audio.play();
			let vol = 0;
			const fadeIn = setInterval(() => {
				vol += notification.volume / 50;
				if (vol >= notification.volume) {
					vol = notification.volume;
					clearInterval(fadeIn);
				}
				audio.volume = Math.min(vol, notification.volume);
			}, 100);
			return;
		}
		playNotification();
	}, [notification.alarm, notification.volume, playNotification]);

	const sendNotification = useCallback(
		(finishedMode: Mode) => {
			playSound();
			if (!notification.desktopNotification) return;
			const granted =
				typeof Notification !== "undefined" &&
				Notification.permission === "granted";
			if (!granted) return;
			const isFocusEnd = finishedMode === Mode.Pomodoro;
			showNotification(
				isFocusEnd ? "Focus complete" : `${getModeTitle(finishedMode)} ended`,
				true,
				{
					body: isFocusEnd
						? "Time to step away and recover."
						: "Back to focus when you are ready.",
					icon: "/favicon.svg",
				},
			);
		},
		[notification.desktopNotification, playSound],
	);

	const nextRemainingTime = useMemo(() => timers[mode], [mode, timers]);

	const sessionProgressPercent = useMemo(() => {
		const total = sessionSegmentTotalSeconds;
		if (total <= 0) return 0;
		const raw = ((total - remainingTime) / total) * 100;
		return Math.min(100, Math.max(0, Math.round(raw)));
	}, [sessionSegmentTotalSeconds, remainingTime]);

	const breakProgressPercent = useMemo(() => {
		if (mode === Mode.Pomodoro) return 0;
		const total = sessionSegmentTotalSeconds;
		if (total <= 0) return 0;
		const raw = ((total - remainingTime) / total) * 100;
		return Math.min(100, Math.max(0, raw));
	}, [mode, sessionSegmentTotalSeconds, remainingTime]);

	useEffect(() => {
		const hasResumedTime = resumedTime > 0;

		const newTime = hasResumedTime ? resumedTime : nextRemainingTime;

		setRemainingTime(newTime);

		if (!hasResumedTime) {
			setSessionSegmentTotalSeconds(newTime);
		} else if (sessionSegmentTotalSeconds <= 0 && newTime > 0) {
			setSessionSegmentTotalSeconds(Math.max(newTime, nextRemainingTime));
		}
	}, [
		nextRemainingTime,
		resumedTime,
		sessionSegmentTotalSeconds,
		setRemainingTime,
		setSessionSegmentTotalSeconds,
	]);

	const getNewMode = useCallback((): Mode => {
		if (mode === Mode.Pomodoro) {
			return pomodoros >= cycleLimit ? Mode.LongBreak : Mode.ShortBreak;
		}
		return Mode.Pomodoro;
	}, [mode, pomodoros, cycleLimit]);

	const handleNextTimer = useCallback(
		({ isSkip }: { isSkip: boolean }) => {
			if (isSkip && mode === Mode.Pomodoro) {
				recordPomodoroSessionStats(false);
			}

			if (mode === Mode.LongBreak) {
				resetHighIntensity();
			}

			const newMode = isSkip
				? mode === Mode.Pomodoro
					? Mode.ShortBreak
					: Mode.Pomodoro
				: getNewMode();

			setMode(newMode);
			if (mode === Mode.Pomodoro) {
				setPomodoros(newMode === Mode.LongBreak ? 1 : pomodoros + 1);
			}
			setIsRunning(false);
			setResumedTime(0);
			setSavedTimeBonus(0);
		},
		[
			mode,
			pomodoros,
			recordPomodoroSessionStats,
			resetHighIntensity,
			getNewMode,
			setMode,
			setPomodoros,
			setIsRunning,
			setResumedTime,
			setSavedTimeBonus,
		],
	);

	const handleToggleTimer = useCallback(
		() => setIsRunning(!isRunning),
		[isRunning, setIsRunning],
	);

	const handleStopTimer = useCallback(() => {
		if (mode !== Mode.Pomodoro) {
			handleNextTimer({ isSkip: true });
			return;
		}
		setRemainingTime(nextRemainingTime);
		setSessionSegmentTotalSeconds(nextRemainingTime);
		setIsRunning(false);
	}, [
		mode,
		handleNextTimer,
		nextRemainingTime,
		setRemainingTime,
		setSessionSegmentTotalSeconds,
		setIsRunning,
	]);

	const handleSkipBreak = useCallback(() => {
		if (mode === Mode.Pomodoro) return;
		handleNextTimer({ isSkip: true });
	}, [mode, handleNextTimer]);

	const handleIntentionFulfilled = useCallback(() => {
		if (mode !== Mode.Pomodoro) return;
		recordPomodoroSessionStats(true);
		sendNotification(Mode.Pomodoro);
		setIsRunning(false);
		setSavedTimeBonus(remainingTime);
		setAwaitingIntentionFulfillment(true);
	}, [
		mode,
		recordPomodoroSessionStats,
		sendNotification,
		setIsRunning,
		setSavedTimeBonus,
		remainingTime,
	]);

	const confirmIntentionFulfillment = useCallback(() => {
		setAwaitingIntentionFulfillment(false);
		const bonus = savedTimeBonus;
		setSavedTimeBonus(0);
		if (bonus > 0) {
			const breakMode =
				pomodoros >= cycleLimit ? Mode.LongBreak : Mode.ShortBreak;
			const baseDuration = timers[breakMode];
			const extendedDuration = baseDuration + bonus;
			setRemainingTime(extendedDuration);
			setSessionSegmentTotalSeconds(extendedDuration);
			setMode(breakMode);
			if (mode === Mode.Pomodoro) {
				setPomodoros(breakMode === Mode.LongBreak ? 1 : pomodoros + 1);
			}
			setIsRunning(false);
			setResumedTime(0);
			return;
		}
		handleNextTimer({ isSkip: false });
	}, [
		savedTimeBonus,
		setSavedTimeBonus,
		pomodoros,
		cycleLimit,
		timers,
		setRemainingTime,
		setSessionSegmentTotalSeconds,
		setMode,
		mode,
		setPomodoros,
		setIsRunning,
		setResumedTime,
		handleNextTimer,
	]);

	const cancelIntentionFulfillment = useCallback(() => {
		setAwaitingIntentionFulfillment(false);
		setSavedTimeBonus(0);
		setIsRunning(true);
		setFinishTime(Date.now() + secondsToMilliseconds(remainingTime));
	}, [setSavedTimeBonus, setIsRunning, setFinishTime, remainingTime]);

	const handleEndTimer = useCallback(() => {
		if (mode === Mode.Pomodoro) {
			recordPomodoroSessionStats(true);
			sendNotification(Mode.Pomodoro);
			setIsRunning(false);
			setSavedTimeBonus(0);
			setAwaitingCycleAck(true);
			return;
		}
		sendNotification(mode);
		setSavedTimeBonus(0);
		handleNextTimer({ isSkip: false });
	}, [
		mode,
		recordPomodoroSessionStats,
		sendNotification,
		setIsRunning,
		setSavedTimeBonus,
		handleNextTimer,
	]);

	const acknowledgeCycleAndContinue = useCallback(() => {
		setAwaitingCycleAck(false);
		const bonus = savedTimeBonus;
		setSavedTimeBonus(0);
		if (bonus > 0) {
			const breakMode =
				pomodoros >= cycleLimit ? Mode.LongBreak : Mode.ShortBreak;
			const baseDuration = timers[breakMode];
			const extendedDuration = baseDuration + bonus;
			setRemainingTime(extendedDuration);
			setSessionSegmentTotalSeconds(extendedDuration);
			setMode(breakMode);
			if (mode === Mode.Pomodoro) {
				setPomodoros(breakMode === Mode.LongBreak ? 1 : pomodoros + 1);
			}
			setIsRunning(false);
			setResumedTime(0);
			return;
		}
		handleNextTimer({ isSkip: false });
	}, [
		savedTimeBonus,
		setSavedTimeBonus,
		pomodoros,
		cycleLimit,
		timers,
		setRemainingTime,
		setSessionSegmentTotalSeconds,
		setMode,
		mode,
		setPomodoros,
		setIsRunning,
		setResumedTime,
		handleNextTimer,
	]);

	const dismissCycleAck = useCallback(() => {
		setAwaitingCycleAck(false);
		setSavedTimeBonus(0);
	}, [setSavedTimeBonus]);

	const onExpireRef = useRef<() => void>(() => {});
	onExpireRef.current = handleEndTimer;

	useTimerTick({
		isRunning,
		remainingTime,
		setFinishTime,
		onExpireRef,
	});

	return {
		handleNextTimer,
		handleStopTimer,
		handleSkipBreak,
		getNewMode,
		handleToggleTimer,
		handleIntentionFulfilled,
		confirmIntentionFulfillment,
		cancelIntentionFulfillment,
		acknowledgeCycleAndContinue,
		dismissCycleAck,
		isRunning,
		remainingTime,
		remainingTimeText,
		finishTime,
		finishTimeText,
		sessionProgressPercent,
		breakProgressPercent,
		sessionSegmentTotalSeconds,
		savedTimeBonus,
		awaitingCycleAck,
		awaitingIntentionFulfillment,
		cycleLimit,
	};
};

export default useTimer;
