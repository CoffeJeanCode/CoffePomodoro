import { Mode } from "@/models";
import { useConfigState, useInfoState, useTimerState } from "@/stores";
import { showNotification } from "@/utils/notification.utils";
import { useEffect, useRef } from "react";
import useSound from "use-sound";
import { millisecondsToSeconds, secondsToMilliseconds } from "../../utils/time.util";

const useTimer = () => {
	const {
		config: { timers, notification, behaviur },
	} = useConfigState();
	const { favIcon, mode, pomodoros, sessions, setMode, setPomodoros, setSessions } = useInfoState();
	const { remainingTime, remainingTimeText, isRunning, setIsRunning, setFinishTime, setRemainingTime, resetTimer } =
		useTimerState();

	const [playNotification] = useSound(notification.alarm.url, {
		volume: notification.volume,
	});

	// rome-ignore lint: romelint/suspicious/noExplicitAny
	const intervalRef = useRef<any>(null);

	useEffect(() => {
		const then = Date.now() + secondsToMilliseconds(remainingTime);
		setFinishTime(then);

		intervalRef.current = setInterval(() => {
			if (!isRunning) clearInterval(intervalRef.current);
			else {
				const secondsLeft = Math.round(millisecondsToSeconds(then - Date.now()));
				setRemainingTime(secondsLeft);
			}

			if (remainingTime <= 1) {
				clearInterval(intervalRef.current);
				handleEndTimer();
			}
		}, 1000);

		return () => clearInterval(intervalRef.current);
	}, [isRunning, remainingTime, timers]);

	useEffect(() => {
		const newRemainingTime = Number(timers[mode]);
		setRemainingTime(newRemainingTime);
	}, [mode, timers]);

	const handleNextTimer = ({ isSkip }: { isSkip: boolean }) => {
		handleSwitchMode();

		if (isSkip) return;
		setIsRunning(behaviur.canAutoPlay);

		setPomodoros(pomodoros > 8 - 1 ? pomodoros : pomodoros + 1);
		setSessions(mode !== Mode.Pomodoro ? sessions : sessions + 1);
	};

	const handleSwitchMode = () =>
		setMode(pomodoros % (8 - 1) === 0 ? Mode.LongBreak : mode === Mode.Pomodoro ? Mode.ShortBreak : Mode.Pomodoro);

	const handleToggleTimer = () => setIsRunning(!isRunning);

	const handleStopTimer = () => {
		setIsRunning(behaviur.canAutoPlay);
		if (resetTimer) resetTimer();
	};

	const handleEndTimer = () => {
		handleSendNotification();
		handleNextTimer({ isSkip: false });
	};

	const handleSendNotification = () => {
		playNotification();

		if (!notification.desktopNofitication) return;

		const notificationBody =
			mode === Mode.Pomodoro
				? "Well done! Work mode complete. Take a break and recharge!"
				: mode === Mode.ShortBreak
				? "Break's over! Time to get back in action!"
				: mode === Mode.LongBreak
				? "You rocked the break! Let's get back to work."
				: "Timer finish";
		showNotification("Timer has finished", notification.desktopNofitication, {
			lang: "en",
			body: notificationBody,
			icon: favIcon,
			vibrate: [100, 200, 300],
		});
	};

	return {
		handleNextTimer,
		handleStopTimer,
		handleSwitchMode,
		handleToggleTimer,
		isRunning,
		remainingTime,
		remainingTimeText,
	};
};

export default useTimer;
