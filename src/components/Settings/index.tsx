import {
  Box,
  Button,
  Container,
  Drawer,
  Group,
  Modal,
  Select,
  Title,
} from "@mantine/core";
import { keys } from "ramda";
import { useState } from "react";

import { FaWrench } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { alarmSelector, currentMode, timersConfig } from "../../state";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";
import { minutesToSeconds, secondsToMinutes } from "../../utils/time.util";
import { SliderSettings } from "./SliderSettings";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [config, setConfig] = useRecoilState(timersConfig);
  const [alarm, setAlarm] = useRecoilState(alarmSelector);

  const handleAlarm = (value: string) => {
    setAlarm(value);
  };

  return (
    <>
      <Button leftIcon={<FaWrench />} onClick={() => setIsOpen(true)}>
        Settings
      </Button>
      <Drawer opened={isOpen} position="left" onClose={() => setIsOpen(false)}>
        <Container>
          <Title order={2} size={35}>
            Settings
          </Title>

          <Box my={20}>
            <Title order={3} size={25}>
              Timers
            </Title>
            <Group>
              <SliderSettings
                title="Work Timer"
                min={10}
                max={60}
                marks={[
                  {
                    value: 25,
                    label: "25",
                  },
                  {
                    value: 40,
                    label: "40",
                  },
                  {
                    value: 60,
                    label: "60",
                  },
                ]}
                defaultValue={secondsToMinutes(config.timers[WORK])}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    timers: {
                      ...config.timers,
                      [WORK]: minutesToSeconds(value),
                    },
                  })
                }
              />
              <SliderSettings
                title="Short Break Timer"
                min={3}
                max={10}
                marks={[
                  {
                    value: 5,
                    label: "5",
                  },
                  {
                    value: 7,
                    label: "7",
                  },
                  {
                    value: 10,
                    label: "10",
                  },
                ]}
                defaultValue={secondsToMinutes(config.timers[SHORT_BREAK])}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    timers: {
                      ...config.timers,
                      [SHORT_BREAK]: minutesToSeconds(value),
                    },
                  })
                }
              />
              <SliderSettings
                title="Long Break Timer"
                min={5}
                max={20}
                marks={[
                  {
                    value: 5,
                    label: "5",
                  },
                  {
                    value: 10,
                    label: "10",
                  },
                  {
                    value: 20,
                    label: "20",
                  },
                ]}
                defaultValue={secondsToMinutes(config.timers[LONG_BREAK])}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    timers: {
                      ...config.timers,
                      [LONG_BREAK]: minutesToSeconds(value),
                    },
                  })
                }
              />
            </Group>
          </Box>

          <Box my={20}>
            <Title order={3} size={25}>
              Alarm
            </Title>
            <Select
              defaultValue={alarm.title}
              data={keys<string>(config.alarms)}
              onChange={handleAlarm}
            ></Select>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export const SettingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useRecoilState(timersConfig);
  const mode = useRecoilValue(currentMode);

  return (
    <>
      <Button
        leftIcon={<FaWrench />}
        color={mode === WORK ? "red.9" : "green.9"}
        onClick={() => setIsOpen(true)}
      >
        Settings
      </Button>
      <Modal
        title="Settings"
        centered
        opened={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box my={20}>
            <Title order={3} size={25}>
              Timers
            </Title>
            <Group
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SliderSettings
                title="Work Timer"
                min={10}
                max={60}
                marks={[
                  {
                    value: 25,
                    label: "25",
                  },
                  {
                    value: 40,
                    label: "40",
                  },
                  {
                    value: 60,
                    label: "60",
                  },
                ]}
                defaultValue={secondsToMinutes(config.timers[WORK])}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    timers: {
                      ...config.timers,
                      [WORK]: minutesToSeconds(value),
                    },
                  })
                }
              />
              <SliderSettings
                title="Short Break Timer"
                min={3}
                max={10}
                marks={[
                  {
                    value: 5,
                    label: "5",
                  },
                  {
                    value: 7,
                    label: "7",
                  },
                  {
                    value: 10,
                    label: "10",
                  },
                ]}
                defaultValue={secondsToMinutes(config.timers[SHORT_BREAK])}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    timers: {
                      ...config.timers,
                      [SHORT_BREAK]: minutesToSeconds(value),
                    },
                  })
                }
              />
              <SliderSettings
                title="Long Break Timer"
                min={5}
                max={20}
                marks={[
                  {
                    value: 5,
                    label: "5",
                  },
                  {
                    value: 10,
                    label: "10",
                  },
                  {
                    value: 20,
                    label: "20",
                  },
                ]}
                defaultValue={secondsToMinutes(config.timers[LONG_BREAK])}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    timers: {
                      ...config.timers,
                      [LONG_BREAK]: minutesToSeconds(value),
                    },
                  })
                }
              />
            </Group>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default Settings;
