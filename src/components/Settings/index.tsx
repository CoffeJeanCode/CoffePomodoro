import {
  Button,
  Container,
  Drawer,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
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
import { SCHEMA_KEYS } from "@/stores/constants";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    config,
    setConfigValue,
    isSettingsChanged,
    saveConfiguration,
    cancelConfiguration,
  } = useConfiguration();
  const { schemas, currentSchemaId, setCurrentSchema, updateCurrentSchema } =
    useSchemasState();

  const handleSaveChangesSettings = () => {
    const newTimers = config.timers as TimerSchema;
    updateCurrentSchema({ ...newTimers });
    saveConfiguration();
  };

  const handleCancelChangesSettings = () => cancelConfiguration();
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
          ["shift+k+s", handleSaveChangesSettings, { preventDefault: true }],
          ["shift+k+c", handleCancelChangesSettings, { preventDefault: true }],
          ...(schemas.map((schema, idx) => [
            `shift+${SCHEMA_KEYS[idx]}`,
            () => {
              setCurrentSchema(
                schema.id === currentSchemaId ? "" : schema.id
              );
            },
          ]) as any),
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
            <Group>
              <Button onClick={handleSaveChangesSettings}>Save Changes</Button>
              <Button onClick={handleCancelChangesSettings} color="red">
                Cancel Changes
              </Button>
            </Group>
          )}
        </Container>
      </Drawer>
    </>
  );
};

export default memo(Settings);
