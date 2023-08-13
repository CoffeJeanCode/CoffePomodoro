import { TimerSchema } from "@/models/schemas";
import {
  Box,
  Button,
  Group,
  Select,
  Slider,
  Switch,
  Title,
} from "@mantine/core";

import { keys } from "ramda";
import { FC } from "react";
import { FaBell } from "react-icons/fa";
import useSound from "use-sound";
import { Configuration } from "../../models";
import { ALARMS } from "../../stores/constants";

type AlarmTitle = keyof typeof ALARMS;

interface Props {
  configuration: Configuration | TimerSchema;
  // rome-ignore lint: romelint/suspicious/noExplicitAny
  setConfigValue: (path: string, value: any) => void;
}

const NotificationSettings: FC<Props> = ({ configuration, setConfigValue }) => {
  const [playNotification] = useSound(configuration.notification.alarm.url, {
    volume: configuration.notification.volume,
  });

  return (
    <Box my={20}>
      <Title order={3} size={25}>
        Notification
      </Title>
      <Group>
        <Box my={5}>
          <Title order={4}>Alarm</Title>
          <Group>
            <Button onClick={() => playNotification()}>
              <FaBell />
            </Button>
            <Select
              value={configuration.notification.alarm.title}
              data={keys(ALARMS)}
              onChange={(title: AlarmTitle) => {
                setConfigValue("notification.alarm", ALARMS[title]);
              }}
            />
            <Box my={5}>
              <Title order={4}>Volume</Title>
              <Slider
                min={0.1}
                max={1}
                step={0.1}
                label={(value) => `${value * 100}%`}
                value={configuration.notification.volume}
                onChange={(value) =>
                  setConfigValue("notification.volume", value)
                }
              />
            </Box>
          </Group>
        </Box>
        <Box my={5}>
          <Title order={4}>Desktop Notifications</Title>
          <Switch
            onLabel="ON"
            offLabel="OFF"
            size="md"
            checked={configuration.notification.desktopNofitication}
            onChange={(evt) => {
              const {
                target: { checked },
              } = evt;
              setConfigValue("notification.desktopNofitication", checked);
              if (checked)
                Notification.requestPermission().then((perm) => {
                  if (perm === "granted")
                    setConfigValue("notification.desktopNofitication", true);
                  else
                    setConfigValue("notification.desktopNofitication", false);
                });
            }}
          />
        </Box>
      </Group>
    </Box>
  );
};

export default NotificationSettings;
