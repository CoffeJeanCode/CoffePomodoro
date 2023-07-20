import {
  Box,
  Button,
  Container,
  Drawer,
  Group,
  ScrollArea,
  Select,
  Slider,
  Switch,
  Title
} from "@mantine/core";
import { useState } from "react";

import { keys } from "ramda";
import { FaWrench } from "react-icons/fa";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../../state/constants";
import { minutesToSeconds, secondsToMinutes } from "../../utils/time.util";
import { SliderSettings } from "./SliderSettings";
import { useConfiguration } from "./useConfiguracion";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    configuration: config,
    isSettingsChanged,
    saveConfiguration,
    setConfigValue
  } = useConfiguration();

  console.log(config);

  return (
    <>
      <Button leftIcon={<FaWrench />} onClick={() => setIsOpen(true)}>
        Settings
      </Button>

      <Drawer
        opened={isOpen}
        position="left"
        onClose={() => setIsOpen(false)}
        scrollAreaComponent={ScrollArea.Autosize}
        mah={"90vh"}
      >
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
                    label: "25"
                  },
                  {
                    value: 40,
                    label: "40"
                  },
                  {
                    value: 60,
                    label: "60"
                  }
                ]}
                defaultValue={secondsToMinutes(config.timers[WORK])}
                onChange={(value) =>
                  setConfigValue(
                    `timers.${WORK}`,
                    import.meta.env.MODE === "development"
                      ? value
                      : minutesToSeconds(value)
                  )
                }
              />
              <SliderSettings
                title="Short Break Timer"
                min={3}
                max={10}
                marks={[
                  {
                    value: 5,
                    label: "5"
                  },
                  {
                    value: 7,
                    label: "7"
                  },
                  {
                    value: 10,
                    label: "10"
                  }
                ]}
                defaultValue={secondsToMinutes(config.timers[SHORT_BREAK])}
                onChange={(value) =>
                  setConfigValue(
                    `timers.${SHORT_BREAK}`,
                    import.meta.env.MODE === "development"
                      ? value
                      : minutesToSeconds(value)
                  )
                }
              />
              <SliderSettings
                title="Long Break Timer"
                min={5}
                max={20}
                marks={[
                  {
                    value: 5,
                    label: "5"
                  },
                  {
                    value: 10,
                    label: "10"
                  },
                  {
                    value: 15,
                    label: "15"
                  },
                  {
                    value: 20,
                    label: "20"
                  }
                ]}
                defaultValue={secondsToMinutes(config.timers[LONG_BREAK])}
                onChange={(value) =>
                  setConfigValue(
                    `timers.${LONG_BREAK}`,
                    minutesToSeconds(value)
                  )
                }
              />
            </Group>
          </Box>
          <Title order={3} size={25}>
            Behaviur
          </Title>
          <Box my={20}>
            <Switch
              label="Auto play timer"
              onLabel="ON"
              offLabel="OFF"
              size="md"
              checked={config.canAutoPlay}
              onChange={(event) =>
                setConfigValue("canAutoPlay", event.currentTarget.checked)
              }
            />
          </Box>
          <Title order={3} size={25}>
            Notification
          </Title>
          <Box my={20}>
            <Group>
              <Box my={5}>
                <Title order={4}>Alarm</Title>
                <Select
                  value={config.notification.alarm.title}
                  data={keys<string>(config.alarms)}
                  onChange={(title: string) => {
                    setConfigValue("notification.alarm", config.alarms[title]);
                  }}
                />
              </Box>
              <Box my={5}>
                <Title order={4}>Volume</Title>
                <Slider
                  min={0.1}
                  max={1}
                  step={0.1}
                  label={(value) => `${value * 100}%`}
                  value={config.notification.volume}
                  onChange={(value) =>
                    setConfigValue("notification.volume", value)
                  }
                />
              </Box>
              <Box my={5}>
                <Title order={4}>Desktop Notifications</Title>
                <Switch
                  checked={config.notification.desktopNofitication}
                  onChange={(evt) => {
                    const {
                      target: { checked }
                    } = evt;
                    setConfigValue("notification.desktopNofitication", checked);
                    if (checked)
                      Notification.requestPermission().then((perm) => {
                        if (perm === "granted")
                          setConfigValue(
                            "notification.desktopNofitication",
                            true
                          );
                        else
                          setConfigValue(
                            "notification.desktopNofitication",
                            false
                          );
                      });
                  }}
                />
              </Box>
            </Group>
          </Box>
          {isSettingsChanged && (
            <Button onClick={() => saveConfiguration()}>Save Changes</Button>
          )}
        </Container>
      </Drawer>
    </>
  );
};

export default Settings;
