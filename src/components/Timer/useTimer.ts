import { and } from "ramda";
import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import useSound from "use-sound";
import notification from "../../assets/Interface.mp3";
import {
  currentSession,
  currentTimer,
  modeSelector,
  timersConfig,
} from "../../state";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";

export const useTimer = () => {
  const [playNotification] = useSound(notification, {
    volume: 0.5,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useRecoilState(modeSelector);
  const [timer, setTimer] = useRecoilState(currentTimer);
  const [session, setSession] = useRecoilState(currentSession);
  const [steps, setSteps] = useState(0);
  const resetCurrentTimer = useResetRecoilState(currentTimer);

  useEffect(() => {
    let interval: number;
    if (and(isPlaying, timer > 0)) {
      interval = setInterval(() => {
        clearInterval(interval);
        setTimer((time) => time - 1);
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
    setSteps(steps < 8 ? steps + 1 : 1);
    if (steps % 2 === 0) setSession(session + 1);
  };

  const resetTimer = () => {
    resetCurrentTimer();
    setMode(WORK);
  };

  const handleSwitchMode = () => {
    setMode(steps >= 8 ? LONG_BREAK : mode === WORK ? SHORT_BREAK : WORK);
  };

  const handleToggleTimer = () => {
    setIsPlaying((isPlay) => !isPlay);
  };

  const handleStopTimer = () => {
    setIsPlaying(false);
    resetTimer();
  };

  return {
    handleNextTimer,
    handleStopTimer,
    handleSwitchMode,
    handleToggleTimer,
    isPlaying,
    mode,
    steps,
    session,
    timer,
    playNotification,
  };
};
