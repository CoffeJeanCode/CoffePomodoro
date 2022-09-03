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
import { cond, equals, not, toUpper } from "ramda";
import { useEffect } from "react";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";
import { WORK } from "../../state/constants";
import { getModeText } from "../../utils/extra.utils";
import {
  getEndTime,
  getTime,
  secondsToMilliseconds,
} from "../../utils/time.util";
import { useTimer } from "./useTimer";

const Timer = () => {
  const {
    handleNextTimer,
    handleStopTimer,
    handleToggleTimer,
    isPlaying,
    mode,
    steps,
    session,
    timer,
  } = useTimer();

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

  return (
    <Container maxWidth="2xl">
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

export const TimerWidget = () => {
  const {
    handleNextTimer,
    handleToggleTimer,
    handleStopTimer,
    timer,
    isPlaying,
    session,
  } = useTimer();
  return (
    <Box bg="red.600" width="100vw" height="100vh">
      <Center height="100vh" flexDirection="column">
        <Heading as="h2" fontSize="10rem">
          {getTime(timer)}
        </Heading>
        <Text fontSize="2rem">session #{session}</Text>
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
  );
};

export default Timer;
