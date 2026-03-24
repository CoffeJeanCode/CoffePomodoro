import { Mode } from "@/models";
import {
	useConfigState,
	useInfoState,
	useSchemasState,
	useStatsState,
	useTimerState,
} from "@/stores";
import { showNotification } from "@/utils/notification.utils";
import { useEffect, useMemo, useRef } from "react";
import useSound from "use-sound";
import { getToday, minutesToSeconds } from "@/utils/time.util";
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

	function recordPomodoroSessionStats() {
		setSessions(sessions + 1);
		updateDailyStats(getToday(date.raw), {
			sessions,
			time: timers[Mode.Pomodoro],
		});
	}

	const [playNotification] = useSound(notification.alarm.url, {
		volume: notification.volume,
		soundEnabled: true,
	});

	const { pomodorosToLongBreak } = behavior;
	const nextRemainingTime = useMemo(() => timers[mode], [mode, timers]);

	const sessionProgressPercent = useMemo(() => {
		const total = sessionSegmentTotalSeconds;
		if (total <= 0) return 0;
		const raw = ((total - remainingTime) / total) * 100;
		return Math.min(100, Math.max(0, Math.round(raw)));
	}, [sessionSegmentTotalSeconds, remainingTime]);

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
		timers,
		nextRemainingTime,
		currentSchemaId,
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
			const progressed =
				total > 0 ? (total - remainingTime) / total : 0;
			if (progressed >= skipCountsSessionMinProgressFraction) {
				recordPomodoroSessionStats();
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
		setIsRunning(behavior.canAutoPlay);
		setResumedTime(0);
	};

	const handleToggleTimer = () => setIsRunning(!isRunning);

	const handleStopTimer = () => {
		if (mode !== Mode.Pomodoro) return;
		setRemainingTime(nextRemainingTime);
		setSessionSegmentTotalSeconds(nextRemainingTime);
		setIsRunning(false);
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
	};

	const handleEndTimer = () => {
		sendNotification();
		handleNextTimer({ isSkip: false });
	};

	const handleComplete = () => {
		recordPomodoroSessionStats();
	};

	const sendNotification = () => {
		playNotification();

		if (!notification.desktopNotification) return;

		const notificationBody =
			mode === Mode.Pomodoro
				? "Well done! Work mode complete. Take a break and recharge!"
				: mode === Mode.ShortBreak
					? "Break's over! Time to get back in action!"
					: mode === Mode.LongBreak
						? "You rocked the break! Let's get back to work."
						: "Timer finish";
		showNotification("Timer has finished", notification.desktopNotification, {
			lang: "en",
			body: notificationBody,
			icon: favIcon,
			data: {
				url: "/",
			},
		});
	};

	const onExpireRef = useRef<() => void>(() => {});
	onExpireRef.current = () => {
		handleEndTimer();
		if (mode === Mode.Pomodoro) {
			handleComplete();
		}
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
		handleAdjustSessionByMinutes,
		getNewMode,
		handleToggleTimer,
		isRunning,
		remainingTime,
		remainingTimeText,
		sessionProgressPercent,
		sessionAdjustStepMinutes,
		skipCountsSessionMinProgressPercent,
	};
};

export default useTimer;
