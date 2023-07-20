import { Box, Button, Center, Group, Text, Title } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";
import { getTime } from "../../utils/time.util";
import SettingsWidget from "../Settings/SettingsWidget";
import useTimer from "./useTimer";

const TimerWidget = () => {
  const {
    handleNextTimer,
    handleToggleTimer,
    handleStopTimer,
    getFinishTime,
    timer,
    isPlaying,
    session,
    mode
  } = useTimer();

  useHotkeys([
    ["shift+P", () => handleToggleTimer()],
    ["shift+S", () => handleStopTimer()],
    ["shift+N", () => handleNextTimer(true)]
  ]);

  return (
    <Box
      sx={(theme) => ({
        width: "100vw",
        height: "100vh",
        background: mode === WORK ? theme.colors.red[7] : theme.colors.green[7]
      })}
    >
      <Center
        sx={{
          height: "100%",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Title
          order={2}
          size={"6rem"}
          color="white"
          sx={{
            userSelect: "none"
          }}
        >
          {getTime(timer)}
        </Title>
        <Text color="white">session #{session}</Text>
        <Group my={10}>
          {!isPlaying ? (
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
                onClick={() => handleNextTimer(true)}
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
                  onClick={() => handleNextTimer(true)}
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
              userSelect: "none"
            }}
          >
            Next timer finish at {getFinishTime()}
          </Title>
        )}
        <SettingsWidget />
      </Center>
    </Box>
  );
};
