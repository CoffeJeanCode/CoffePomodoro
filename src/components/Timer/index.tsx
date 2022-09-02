import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Icon,
  Text,
  useEventListener,
} from "@chakra-ui/react";
import { and, cond, equals, not, toUpper } from "ramda";
import { useEffect, useState } from "react";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";
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
import { getModeText } from "../../utils/extra.utils";
import {
  getEndTime,
  getTime,
  secondsToMilliseconds,
} from "../../utils/time.util";

const Timer = () => {
  const [playNotification] = useSound(notification, {
    volume: 0.5,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useRecoilState(modeSelector);
  const [timer, setTimer] = useRecoilState(currentTimer);
  const [session, setSession] = useRecoilState(currentSession);
  const [steps, setSteps] = useState(0);
  const resetCurrentTimer = useResetRecoilState(currentTimer);
  const keys = cond([
    [equals(" "), () => handleToggleTimer()],
    [equals("p"), () => handleStopTimer()],
    [equals("n"), () => handleNextTimer()],
  ]);

  useEventListener("keyup", (evt: KeyboardEvent) => {
    if (evt.target !== document.body) return;
    keys(evt.key);
  });

  useEffect(() => {
    document.title = `${getTime(timer)} | ${getModeText(mode)}`;
  }, [mode, timer]);

  useEffect(() => {
    if (and(isPlaying, timer > 0)) {
      const interval = setInterval(() => {
        clearInterval(interval);
        setTimer((time) => time - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer <= 0) {
      playNotification();
      handleNextTimer();
    }
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

  return (
    <Container maxW="2xl">
      <Box
        boxShadow="lg"
        padding="4"
        borderRadius="lg"
        marginY="2.5"
        bg={mode === WORK ? "red.600" : "green.600"}
      >
        <Badge bg={mode === WORK ? "red.400" : "green.400"} textColor="white">
          {toUpper(getModeText(mode))}
        </Badge>
        <Center flexDirection={"column"}>
          <Heading as="h3" size="4xl" color="white" userSelect="none">
            {getTime(timer)}
          </Heading>
          <Text marginTop="2" userSelect="none">
            Session #{session}
          </Text>
          <ButtonGroup marginY="3.5">
            {not(isPlaying) ? (
              <>
                <Button
                  leftIcon={<Icon as={FaPlay} />}
                  title="Play <Space>"
                  onClick={handleToggleTimer}
                >
                  Play
                </Button>
                {timer && (
                  <Button
                    leftIcon={<Icon as={FaStepForward} />}
                    onClick={handleNextTimer}
                  >
                    Skip
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  leftIcon={<Icon as={FaPause} />}
                  title="Pause <Space>"
                  onClick={handleToggleTimer}
                >
                  Pause
                </Button>
                <Button
                  leftIcon={<Icon as={FaStop} />}
                  title="Stop <P>"
                  onClick={handleStopTimer}
                >
                  Stop
                </Button>
              </>
            )}
          </ButtonGroup>
          {isPlaying && (
            <Heading as="h5" size="sm" color="white" userSelect="none">
              Next timer finish at{" "}
              {getEndTime(Date.now() + secondsToMilliseconds(timer))}
            </Heading>
          )}
        </Center>
      </Box>
    </Container>
  );
};

export default Timer;
