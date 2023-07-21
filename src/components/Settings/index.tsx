import { Button, Container, Drawer, ScrollArea, Title } from "@mantine/core";
import { memo, useState } from "react";

import { FaWrench } from "react-icons/fa";
import BehaviurSettings from "./BehaviurSettings";
import NotificationSettings from "./NotificationSettings";
import TimerSettings from "./TimerSettings";
import { useConfiguration } from "./useConfiguracion";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    configuration,
    setConfigValue,
    isSettingsChanged,
    saveConfiguration
  } = useConfiguration();

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

          <TimerSettings
            configuration={configuration}
            setConfigValue={setConfigValue}
          />
          <BehaviurSettings
            configuration={configuration}
            setConfigValue={setConfigValue}
          />
          <NotificationSettings
            configuration={configuration}
            setConfigValue={setConfigValue}
          />

          {isSettingsChanged && (
            <Button onClick={() => saveConfiguration()}>Save Changes</Button>
          )}
        </Container>
      </Drawer>
    </>
  );
};

export default memo(Settings);
