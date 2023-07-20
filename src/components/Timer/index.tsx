import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Group,
  Text,
  Title
} from "@mantine/core";
import { useDocumentTitle, useHotkeys } from "@mantine/hooks";
import { useEffect } from "react";
import { FaPause, FaPlay, FaStepForward, FaStop } from "react-icons/fa";
import { useRecoilState } from "recoil";
import useChangeFavIcon from "../../hooks/useChangeFavIcon";
import { currentIcon } from "../../state";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";
import { getModeText } from "../../utils/extra.utils";
import { getTime } from "../../utils/time.util";
import useTimer from "./useTimer";

const Timer = () => {
  const {
    handleNextTimer,
    handleStopTimer,
    handleToggleTimer,
    getFinishTime,
    isPlaying,
    mode,
    session,
    timer
  } = useTimer();
  const [favIcon, setFavIcon] = useRecoilState(currentIcon);

  useEffect(() => {
    setFavIcon(mode !== WORK ? "favicon.svg" : "favicon-break.svg");
  }, [mode]);

  useChangeFavIcon({ new: favIcon, original: "favicon.svg" }, 16, [mode]);

  useHotkeys([
    ["Space", () => handleToggleTimer()],
    ["S", () => handleStopTimer()],
    ["N", () => handleNextTimer(true)]
  ]);

  useDocumentTitle(`${getTime(timer)} | ${getModeText(mode)}`);

  const playButtonProps = {
    leftIcon: isPlaying ? <FaPause /> : <FaPlay />,
    title: isPlaying ? "Pause <Space>" : "Play <Space>",
    color: mode === WORK ? "red.9" : "green.9",
    onClick: handleToggleTimer
  };

  const skipButtonProps = {
    leftIcon: <FaStepForward />,
    color: mode === WORK ? "red.9" : "green.9",
    onClick: () => handleNextTimer(true)
  };

  const pauseButtonProps = {
    leftIcon: <FaPause />,
    title: "Pause <Space>",
    color: mode === WORK ? "red.9" : "green.9",
    onClick: () => handleToggleTimer()
  };

  const stopButtonProps = {
    leftIcon: <FaStop />,
    title: "Stop <S>",
    color: mode === WORK ? "red.9" : "green.9",
    onClick: handleStopTimer
  };

  return (
    <Container>
      <Box
        sx={(theme) => ({
          minWidth: "30vw",
          background:
            mode === WORK ? theme.colors.red[7] : theme.colors.green[7],
          padding: theme.spacing.md,
          borderRadius: theme.spacing.md,
          transition: "background .7s ease"
        })}
      >
        <Badge
          sx={(theme) => ({
            background:
              mode === WORK ? theme.colors.red[4] : theme.colors.green[4],
            color: theme.colors.gray[0],
            userSelect: "none"
          })}
        >
          {getModeText(mode).toLocaleUpperCase()}
        </Badge>
        <Center sx={{ flexDirection: "column" }}>
          <Title order={3} size={80} color="white">
            {getTime(timer)}
          </Title>
          <Text color="white">Session #{session}</Text>
          <Group my={10}>
            {!isPlaying ? (
              <>
                <Button {...playButtonProps}>Play</Button>
                <Button {...skipButtonProps}>Skip</Button>
              </>
            ) : (
              <>
                <Button {...pauseButtonProps}>Pause</Button>
                {mode === SHORT_BREAK || mode === LONG_BREAK ? (
                  <Button {...skipButtonProps}>Skip</Button>
                ) : (
                  <Button {...stopButtonProps}>Stop</Button>
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

export default Timer;
