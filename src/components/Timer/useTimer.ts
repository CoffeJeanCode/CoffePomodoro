import { and } from "ramda";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import useSound from "use-sound";
import {
  alarmSelector,
  currentSession,
  currentTimer,
  modeSelector,
  timersConfig,
} from "../../state";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";
import { getEndTime, secondsToMilliseconds } from "../../utils/time.util";

export const useTimer = () => {
  const [currentAlarm] = useRecoilState(alarmSelector);
  const [playNotification] = useSound(currentAlarm.url, {
    volume: 0.5,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useRecoilState(modeSelector);
  const [timer, setTimer] = useRecoilState(currentTimer);
  const [session, setSession] = useRecoilState(currentSession);
  const [steps, setSteps] = useState(1);
  const resetCurrentTimer = useResetRecoilState(currentTimer);

  useEffect(() => {
    let interval: number;
    if (and(isPlaying, timer > 0)) {
      interval = setInterval(() => {
        clearInterval(interval);
        setTimer((time: number) => time - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer <= 0) {
      playNotification();
      handleNextTimer();
    }

    return () => clearInterval(interval);
  }, [timer, isPlaying, timersConfig]);

  useEffect(() => {
    setMode(WORK);
  }, []);

  const handleNextTimer = () => {
    resetTimer();
    handleSwitchMode();
    setIsPlaying(false);
    if (steps % 2 === 0) setSession(session + 1);
    setSteps(steps < 8 ? steps + 1 : 1);
  };

  const resetTimer = () => {
    resetCurrentTimer();
    setMode(WORK);
  };

  const handleSwitchMode = () =>
    setMode(steps === 7 ? LONG_BREAK : mode === WORK ? SHORT_BREAK : WORK);

  const handleToggleTimer = () => setIsPlaying((isPlay) => !isPlay);

  const handleStopTimer = () => {
    setIsPlaying(false);
    resetTimer();
  };

  const getFinishTime = () => {
    const now = Date.now();
    return getEndTime(now + secondsToMilliseconds(timer));
  };

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
    playNotification,
  };
};
