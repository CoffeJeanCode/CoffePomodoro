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
import {
  getToday,
  millisecondsToSeconds,
  secondsToMilliseconds,
} from "../../utils/time.util";

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
    setIsRunning,
    setFinishTime,
    setResumedTime,
    setRemainingTime,
  } = useTimerState();
  const updateDailyStats = useStatsState((stats) => stats.updateDailyStats);

  const { timers, notification, behaviur } =
    currentSchemaId === "" ? config : findCurrentSchema() ?? config;

  const [playNotification] = useSound(notification.alarm.url, {
    volume: notification.volume,
  });

  // rome-ignore lint: romelint/suspicious/noExplicitAny
  const intervalRef = useRef<any>(null);
  const calculatedToLongBreak = useMemo(
    () => behaviur.pomodorosToLongBreak * 2 - 1,
    [behaviur]
  );
  const nextRemainingTime = useMemo(() => timers[mode], [mode, timers]);

  useEffect(() => {
    const nextTime = resumedTime <= 0 ? nextRemainingTime : resumedTime;
    setRemainingTime(nextTime);
  }, [nextRemainingTime]);

  useEffect(() => {
    const then = Date.now() + secondsToMilliseconds(remainingTime);
    setFinishTime(then);

    intervalRef.current = setInterval(() => {
      if (!isRunning) {
        clearInterval(intervalRef.current);
      } else {
        const secondsLeft = Math.round(
          millisecondsToSeconds(then - Date.now())
        );
        setResumedTime(remainingTime);
        setRemainingTime(secondsLeft);
      }

      if (remainingTime <= 1) {
        clearInterval(intervalRef.current);
        handleEndTimer();
        if (mode === Mode.Pomodoro) {
          handleComplete();
        }
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timers, remainingTime]);

  const handleNextTimer = ({ isSkip }: { isSkip: boolean }) => {
    const newMode = isSkip
      ? mode === Mode.Pomodoro
        ? Mode.ShortBreak
        : Mode.Pomodoro
      : getNewMode();

    setMode(newMode);
    setPomodoros(pomodoros > calculatedToLongBreak ? 1 : pomodoros + 1);
    setIsRunning(behaviur.canAutoPlay);
    setResumedTime(0);
  };

  const getNewMode = () =>
    pomodoros % (calculatedToLongBreak + 1) === 0
      ? Mode.LongBreak
      : mode === Mode.Pomodoro
      ? Mode.ShortBreak
      : Mode.Pomodoro;

  const handleToggleTimer = () => setIsRunning(!isRunning);

  const handleStopTimer = () => {
    if (mode !== Mode.Pomodoro) return;
    setRemainingTime(nextRemainingTime);
    setIsRunning(behaviur.canAutoPlay);
  };

  const handleEndTimer = () => {
    sendNotification();
    handleNextTimer({ isSkip: false });
  };

  const handleComplete = () => {
    setSessions(sessions + 1);
    updateDailyStats(getToday(date.raw), {
      sessions,
      time: timers[Mode.Pomodoro],
    });
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
      vibrate: [100, 200, 300],
    });
  };

  return {
    handleNextTimer,
    handleStopTimer,
    getNewMode,
    handleToggleTimer,
    isRunning,
    remainingTime,
    remainingTimeText,
  };
};

export default useTimer;
