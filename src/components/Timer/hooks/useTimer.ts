import { Mode } from "@/models";
import { DEPTH_PRESETS } from "@/models/depth";
import {
	useConfigState,
	useDepthState,
	useInfoState,
	useStatsState,
	useTimerState,
} from "@/stores";
import {
	getToday,
	minutesToSeconds,
	secondsToMilliseconds,
} from "@/utils/time.util";
import { useEffect, useMemo, useRef, useState } from "react";
import useSound from "use-sound";
import { useTimerTick } from "./useTimerTick";

const useTimer = () => {
	const { activePreset } = useDepthState();
	const config = useConfigState((state) => state.config);
	const {
		date,
		favIcon,
		mode,
		pomodoros,
		sessions,
		setMode,
		setPomodoros,
		setSessions,
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
	const [awaitingIntentionFulfillment, setAwaitingIntentionFulfillment] = useState(false);

	const preset = DEPTH_PRESETS[activePreset];
	const { timers, behavior } = preset;

	const notification = config.notification;

	const sessionAdjustStepMinutes = Math.min(
		30,
		Math.max(1, behavior.sessionAdjustStepMinutes ?? 5),
	);
	const skipCountsSessionMinProgressPercent = Math.min(
		100,
		Math.max(0, behavior.skipCountsSessionMinProgressPercent ?? 100),
	);
	const skipCountsSessionMinProgressFraction =
		skipCountsSessionMinProgressPercent / 100;

	function recordPomodoroSessionStats(isCompleted: boolean) {
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
	}

	const [playNotification, { stop: stopNotification }] = useSound(
		notification.alarm.url,
		{
			volume: notification.volume,
			soundEnabled: true,
		},
	);

	const sendNotification = () => {
		if (notification.volume > 0) {
			const isSoundscape =
				(notification.alarm as { type?: string }).type === "soundscape";
			if (isSoundscape) {
				const audio = new Audio(notification.alarm.url);
				audio.volume = 0;
				audio.loop = true;
				audio.play();
				let vol = 0;
				const fadeIn = setInterval(() => {
					vol += notification.volume / 50;
					if (vol >= notification.volume) {
						vol = notification.volume;
						clearInterval(fadeIn);
					}
					audio.volume = Math.min(vol, notification.volume);
				}, 100);
			} else {
				playNotification();
			}
		}
	};

	const { pomodorosToLongBreak } = behavior;
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

	const getNewMode = () => {
		if (mode === Mode.Pomodoro) {
			return pomodoros === pomodorosToLongBreak
				? Mode.LongBreak
				: Mode.ShortBreak;
		}
		return Mode.Pomodoro;
	};

	const handleNextTimer = ({ isSkip }: { isSkip: boolean }) => {
		if (isSkip && mode === Mode.Pomodoro) {
			const total = sessionSegmentTotalSeconds;
			const progressed = total > 0 ? (total - remainingTime) / total : 0;
			if (progressed >= skipCountsSessionMinProgressFraction) {
				recordPomodoroSessionStats(false);
			}
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
	};

	const handleToggleTimer = () => setIsRunning(!isRunning);

	const handleStopTimer = () => {
		if (mode !== Mode.Pomodoro) {
			handleNextTimer({ isSkip: true });
			return;
		}
		setRemainingTime(nextRemainingTime);
		setSessionSegmentTotalSeconds(nextRemainingTime);
		setIsRunning(false);
	};

	const handleSkipBreak = () => {
		if (mode === Mode.Pomodoro) return;
		handleNextTimer({ isSkip: true });
	};

	const handleAdjustSessionByMinutes = (delta: 1 | -1) => {
		const stepSeconds = minutesToSeconds(sessionAdjustStepMinutes);
		const deltaSeconds = delta * stepSeconds;
		const effectiveTotal =
			sessionSegmentTotalSeconds > 0
				? sessionSegmentTotalSeconds
				: Math.max(remainingTime, nextRemainingTime);
		const nextTotal = Math.max(2, effectiveTotal + deltaSeconds);
		const next = Math.max(2, remainingTime + deltaSeconds);
		setSessionSegmentTotalSeconds(nextTotal);
		setRemainingTime(next);
		setResumedTime(next);
		if (isRunning) {
			setFinishTime(Date.now() + secondsToMilliseconds(next));
		}
	};

	const handleIntentionFulfilled = () => {
		if (mode !== Mode.Pomodoro) return;
		recordPomodoroSessionStats(true);
		sendNotification();
		setIsRunning(false);
		setSavedTimeBonus(remainingTime);
		setAwaitingIntentionFulfillment(true);
	};

	const confirmIntentionFulfillment = () => {
		setAwaitingIntentionFulfillment(false);
		const bonus = savedTimeBonus;
		setSavedTimeBonus(0);
		if (bonus > 0) {
			const breakMode = pomodoros === pomodorosToLongBreak
				? Mode.LongBreak
				: Mode.ShortBreak;
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
	};

	const cancelIntentionFulfillment = () => {
		setAwaitingIntentionFulfillment(false);
		setSavedTimeBonus(0);
		setIsRunning(true);
		setFinishTime(Date.now() + secondsToMilliseconds(remainingTime));
	};

	const handleEndTimer = () => {
		if (mode === Mode.Pomodoro) {
			handleComplete();
			sendNotification();
			setIsRunning(false);
			setSavedTimeBonus(0);
			setAwaitingCycleAck(true);
			return;
		}
		sendNotification();
		setSavedTimeBonus(0);
		handleNextTimer({ isSkip: false });
 };

	const acknowledgeCycleAndContinue = () => {
		setAwaitingCycleAck(false);
		const bonus = savedTimeBonus;
		setSavedTimeBonus(0);
		if (bonus > 0) {
			const breakMode = pomodoros === pomodorosToLongBreak
				? Mode.LongBreak
				: Mode.ShortBreak;
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
	};

	const dismissCycleAck = () => {
		setAwaitingCycleAck(false);
		setSavedTimeBonus(0);
	};

	const handleComplete = () => {
		recordPomodoroSessionStats(true);
	};

	const onExpireRef = useRef<() => void>(() => {});
	onExpireRef.current = () => {
		handleEndTimer();
	};

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
		handleAdjustSessionByMinutes,
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
		sessionAdjustStepMinutes,
		skipCountsSessionMinProgressPercent,
		sessionSegmentTotalSeconds,
		savedTimeBonus,
		awaitingCycleAck,
		awaitingIntentionFulfillment,
	};
};

export default useTimer;
