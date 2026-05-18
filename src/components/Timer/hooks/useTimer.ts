import { Mode } from "@/models";
import {
	useConfigState,
	useInfoState,
	useSchemasState,
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
import { resolveActiveConfiguration } from "./timer/resolveActiveConfiguration";
import { useTimerTick } from "./useTimerTick";

const useTimer = () => {
	const { currentSchemaId, findCurrentSchema } = useSchemasState();
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
		setIsRunning,
		setFinishTime,
		setResumedTime,
		setRemainingTime,
		setSessionSegmentTotalSeconds,
	} = useTimerState();
	const updateDailyStats = useStatsState((stats) => stats.updateDailyStats);
	const updateStreak = useStatsState((stats) => stats.updateStreak);
	const [awaitingCycleAck, setAwaitingCycleAck] = useState(false);

	const active = resolveActiveConfiguration(
		config,
		currentSchemaId,
		findCurrentSchema,
	);
	const { timers, notification, behavior } = active;

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
		updateStreak(date.raw);
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

	const handleEndTimer = () => {
		if (mode === Mode.Pomodoro) {
			handleComplete();
			sendNotification();
			setIsRunning(false);
			setAwaitingCycleAck(true);
			return;
		}
		sendNotification();
		handleNextTimer({ isSkip: false });
	};

	const acknowledgeCycleAndContinue = () => {
		setAwaitingCycleAck(false);
		handleNextTimer({ isSkip: false });
	};

	const dismissCycleAck = () => {
		setAwaitingCycleAck(false);
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
		awaitingCycleAck,
	};
};

export default useTimer;
