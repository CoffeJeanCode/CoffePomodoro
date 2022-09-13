import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useDocumentTitle, useHotkeys } from "@mantine/hooks";
import { not, toUpper } from "ramda";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";
import { getModeText } from "../../utils/extra.utils";
import { getTime } from "../../utils/time.util";
import { useTimer } from "./useTimer";

const Timer = () => {
  const {
    handleNextTimer,
    handleStopTimer,
    handleToggleTimer,
    getFinishTime,
    isPlaying,
    steps,
    mode,
    session,
    timer,
  } = useTimer();

  useHotkeys([
    ["Space", () => handleToggleTimer()],
    ["S", () => handleStopTimer()],
    ["N", () => handleNextTimer()],
  ]);

  useDocumentTitle(`${getTime(timer)} | ${getModeText(mode)}`);

  return (
    <Container>
      <Box
        sx={(theme) => ({
          minWidth: "30vw",
          background:
            mode === WORK ? theme.colors.red[7] : theme.colors.green[7],
          padding: theme.spacing.md,
          borderRadius: theme.spacing.md,
        })}
      >
        <Badge
          sx={(theme) => ({
            background:
              mode === WORK ? theme.colors.red[4] : theme.colors.green[4],
            color: theme.colors.gray[0],
            userSelect: "none",
          })}
        >
          {toUpper(getModeText(mode))}
        </Badge>
        <Center sx={{ flexDirection: "column" }}>
          <Title order={3} size={80} color="white">
            {getTime(timer)}
          </Title>
          <Text color="white">Session #{session}</Text>
          <Group my={10}>
            {not(isPlaying) ? (
              <>
                <Button
                  leftIcon={<FaPlay />}
                  title="Play <Space>"
                  color={mode === WORK ? "red.9" : "green.9"}
                  onClick={handleToggleTimer}
                >
                  Play
                </Button>
                <Button
                  leftIcon={<FaStepForward />}
                  title="Skip <N>"
                  color={mode === WORK ? "red.9" : "green.9"}
                  onClick={handleNextTimer}
                >
                  Skip
                </Button>
              </>
            ) : (
              <>
                <Button
                  leftIcon={<FaPause />}
                  title="Pause <Space>"
                  color={mode === WORK ? "red.9" : "green.9"}
                  onClick={handleToggleTimer}
                >
                  Pause
                </Button>
                {mode === SHORT_BREAK || mode === LONG_BREAK ? (
                  <Button
                    leftIcon={<FaStepForward />}
                    color={mode === WORK ? "red.9" : "green.9"}
                    onClick={handleNextTimer}
                  >
                    Skip
                  </Button>
                ) : (
                  <Button
                    leftIcon={<FaStop />}
                    title="Stop <P>"
                    color={mode === WORK ? "red.9" : "green.9"}
                    onClick={handleStopTimer}
                  >
                    Stop
                  </Button>
                )}
              </>
            )}
          </Group>
          {isPlaying && (
            <Title order={5} size="h5" my={10} color="white">
              Next timer finish at {getFinishTime()}
            </Title>
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
    getFinishTime,
    timer,
    isPlaying,
    session,
    mode,
  } = useTimer();

  useHotkeys([
    ["shift+P", () => handleToggleTimer()],
    ["shift+S", () => handleStopTimer()],
    ["shift+N", () => handleNextTimer()],
  ]);

  return (
    <Box
      sx={(theme) => ({
        width: "100vw",
        height: "100vh",
        background: mode === WORK ? theme.colors.red[7] : theme.colors.green[7],
      })}
    >
      <Center
        sx={{ height: "100%", alignItems: "center", flexDirection: "column" }}
      >
        <Title
          order={2}
          size={"6rem"}
          color="white"
          sx={{
            userSelect: "none",
          }}
        >
          {getTime(timer)}
        </Title>
        <Text color="white">session #{session}</Text>
        <Group my={10}>
          {not(isPlaying) ? (
            <>
              <Button
                leftIcon={<FaPlay />}
                title="Play <Space>"
                color={mode === WORK ? "red.9" : "green.9"}
                onClick={handleToggleTimer}
              >
                Play
              </Button>
              <Button
                leftIcon={<FaStepForward />}
                title="Skip <N>"
                color={mode === WORK ? "red.9" : "green.9"}
                onClick={handleNextTimer}
              >
                Skip
              </Button>
            </>
          ) : (
            <>
              <Button
                leftIcon={<FaPause />}
                title="Pause <Space>"
                color={mode === WORK ? "red.9" : "green.9"}
                onClick={handleToggleTimer}
              >
                Pause
              </Button>
              {mode === SHORT_BREAK || mode === LONG_BREAK ? (
                <Button
                  leftIcon={<FaStepForward />}
                  color={mode === WORK ? "red.9" : "green.9"}
                  onClick={handleNextTimer}
                >
                  Skip
                </Button>
              ) : (
                <Button
                  leftIcon={<FaStop />}
                  title="Stop <P>"
                  color={mode === WORK ? "red.9" : "green.9"}
                  onClick={handleStopTimer}
                >
                  Stop
                </Button>
              )}
            </>
          )}
        </Group>
        {isPlaying && (
          <Title
            order={5}
            size="h5"
            color="white"
            sx={{
              userSelect: "none",
            }}
          >
            Next timer finish at {getFinishTime()}
          </Title>
        )}
      </Center>
    </Box>
  );
};

export default Timer;
