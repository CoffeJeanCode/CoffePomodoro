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
import {
  getEndTime,
  millisecondsToSeconds,
  secondsToMilliseconds,
} from "../../utils/time.util";

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
  const [finishTime, setFinishTime] = useState(0);
  const resetCurrentTimer = useResetRecoilState(currentTimer);

  useEffect(() => {
    let interval: number;

    interval = setInterval(() => {
      let secondsLeft = Math.round(
        millisecondsToSeconds(finishTime - Date.now())
      );
      if (isPlaying) setTimer(secondsLeft);

      if (timer <= 1) {
        clearInterval(interval);
        playNotification();
        handleNextTimer();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isPlaying, timersConfig]);

  useEffect(() => {
    const then = Date.now() + secondsToMilliseconds(timer);
    setFinishTime(then);
  }, [isPlaying]);

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
    playNotification,
  };
};
