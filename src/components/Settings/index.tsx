import { Button, Container, Drawer, ScrollArea, Title } from "@mantine/core";
import { memo, useState } from "react";

import { TimerSchema } from "@/models/schemas";
import { useSchemasState } from "@/stores/states/schema";
import { getHotkeyHandler } from "@mantine/hooks";
import { FaWrench } from "react-icons/fa";
import { useConfiguration } from "../../hooks/useConfiguracion";
import BehaviurSettings from "./BehaviurSettings";
import NotificationSettings from "./NotificationSettings";
import SchemaSettings from "./SchemaSettings";
import TimerSettings from "./TimerSettings";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { config, setConfigValue, isSettingsChanged, saveConfiguration } =
    useConfiguration();
  const { updateCurrentSchema, currentSchemaId } = useSchemasState();

  const handleSaveSettings = () => {
    const newTimers = config.timers as TimerSchema;
    updateCurrentSchema({ ...newTimers });
    saveConfiguration();
  };

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
        onKeyDown={getHotkeyHandler([
          ["shift+k+s", handleSaveSettings, { preventDefault: true }],
        ])}
      >
        <Container>
          <Title order={2} size={35}>
            Settings
          </Title>
          <SchemaSettings
            configuration={config}
            setConfigValue={setConfigValue}
          />
          <TimerSettings
            configuration={config}
            setConfigValue={setConfigValue}
          />
          <BehaviurSettings
            configuration={config}
            setConfigValue={setConfigValue}
          />
          <NotificationSettings
            configuration={config}
            setConfigValue={setConfigValue}
          />

          {isSettingsChanged && (
            <Button onClick={handleSaveSettings}>Save Changes</Button>
          )}
        </Container>
      </Drawer>
    </>
  );
};

export default memo(Settings);
