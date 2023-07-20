import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import useSound from "use-sound";
import {
  config as configAtom,
  currentDate,
  currentPomodoro,
  currentSession,
  currentTimer,
  modeSelector,
  stats
} from "../../state";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";
import {
  getDate,
  getEndTime,
  getWeekday,
  isToday,
  millisecondsToSeconds,
  secondsToMilliseconds
} from "../../utils/time.util";

const useTimer = () => {
  const config = useRecoilValue(configAtom);
  const [playNotification] = useSound(config.alarm.url, {
    volume: 0.5
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [date, setDate] = useRecoilState(currentDate);
  const [mode, setMode] = useRecoilState(modeSelector);
  const [timer, setTimer] = useRecoilState(currentTimer);
  const [session, setSession] = useRecoilState(currentSession);
  const [steps, setSteps] = useRecoilState(currentPomodoro);
  const [statistics, setStatistics] = useRecoilState(stats);
  const [finishTime, setFinishTime] = useState(0);
  const resetCurrentTimer = useResetRecoilState(currentTimer);

  useEffect(() => {
    let interval: number;
    const then = Date.now() + secondsToMilliseconds(timer);
    setFinishTime(then);

    interval = setInterval(() => {
      if (!isPlaying) clearInterval(interval);
      else {
        const secondsLeft = Math.round(
          millisecondsToSeconds(then - Date.now())
        );
        setTimer(secondsLeft);
      }

      if (timer <= 1) {
        clearInterval(interval);
        handleEndTimer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isPlaying, mode, config]);

  useEffect(() => {
    setMode(mode);
  }, [config.timers]);

  useEffect(() => {
    const verifyDay = isToday(date);
    setDate(getDate(new Date()));
    setMode(verifyDay(mode, WORK));
    setSession(verifyDay(session, 1));
    setSteps(verifyDay(steps, 1));
  }, []);

  const handleNextTimer = (isSkip: boolean = false) => {
    resetTimer();
    handleSwitchMode();
    setIsPlaying(config.canAutoPlay);
    setSteps((steps: number) => (steps > 8 - 1 ? 1 : steps + 1));
    if (isSkip) return;
    if (mode === WORK) setSession((session: number) => session + 1);
  };

  const resetTimer = () => {
    resetCurrentTimer();
    setMode(WORK);
  };

  const handleSwitchMode = () =>
    setMode(
      steps % (8 - 1) === 0 ? LONG_BREAK : mode === WORK ? SHORT_BREAK : WORK
    );

  const handleToggleTimer = () => setIsPlaying((isPlay) => !isPlay);

  const handleStopTimer = () => {
    setIsPlaying(config.canAutoPlay);
    resetTimer();
  };

  const handleEndTimer = () => {
    handleSendNotification();
    handleNextTimer();
    if (mode !== WORK) return;
    const today = getWeekday(new Date().getDay());
    const newStatistics = updateStatisticsForToday(today);
    setStatistics(newStatistics);
  };

  const updateStatisticsForToday = (today: string) => {
    const existingStats = statistics[today] || { sessions: 0, time: 0 };
    const updatedStats = {
      ...existingStats,
      sessions: session,
      time: existingStats.time + config.timers[WORK]
    };
    return {
      ...statistics,
      [today]: updatedStats
    };
  };

  const handleSendNotification = () => {
    playNotification();
  };

  const getFinishTime = () => getEndTime(finishTime);

  return {
    handleNextTimer,
    handleStopTimer,
    handleSwitchMode,
    handleToggleTimer,
    getFinishTime,
    isPlaying,
    mode,
    steps,
    session,
    timer,
    playNotification
  };
};

export default useTimer;
