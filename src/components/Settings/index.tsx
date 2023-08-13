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
import { Configuration } from "@/models";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    config,
    isSettingsChanged,
    setConfigValue,
    saveConfiguration,
    cancelConfiguration,
  } = useConfiguration();
  const {
    schemas,
    currentSchemaId,
    setCurrentSchema,
    updateCurrentSchema,
    findCurrentSchema,
  } = useSchemasState();
  const currentConfig =
    currentSchemaId === "" ? config : findCurrentSchema() ?? config;

  const handleSaveChangesSettings = () => {
    const newConfigSchema = config as TimerSchema;
    updateCurrentSchema({ ...newConfigSchema });
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
              setCurrentSchema(schema.id === currentSchemaId ? "" : schema.id);
            },
          ]) as any),
        ])}
      >
        <Container>
          <Title order={2} size={35}>
            Settings
          </Title>
          <SchemaSettings
            configuration={currentConfig}
            setConfigValue={setConfigValue}
          />
          <TimerSettings
            configuration={currentConfig}
            setConfigValue={setConfigValue}
          />
          <BehaviurSettings
            configuration={currentConfig}
            setConfigValue={setConfigValue}
          />
          <NotificationSettings
            configuration={currentConfig}
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
