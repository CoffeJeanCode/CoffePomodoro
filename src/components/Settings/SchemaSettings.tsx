import { Configuration } from "@/models";
import { SCHEMA_KEYS } from "@/stores/constants";
import { useSchemasState } from "@/stores/states/schema";
import { secondsToMinutes } from "@/utils/time.util";
import { Box, Button, Chip, Flex, ScrollArea, Title } from "@mantine/core";
import { values } from "ramda";
import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import SchemaSettingItem from "./components/SchemaSettingItem";

interface Props {
  configuration: Configuration;
  // rome-ignore lint: romelint/suspicious/noExplicitAny
  setConfigValue: (path: string, value: any) => void;
}

const SchemaSettings: FC<Props> = ({ configuration }) => {
  const { schemas, currentSchemaId, addSchema, setCurrentSchema } =
    useSchemasState();
  const { timers } = configuration;

  const handleAddSchema = () => {
    addSchema({
      title: values(timers).map(secondsToMinutes).join(" "),
      ...timers,
    });
  };

  const handleSetCurrentSchema = (id: string) => setCurrentSchema(id);

  return (
    <Box my={20}>
      <Title order={3} size={25}>
        Schemas
      </Title>
      <Chip.Group onChange={handleSetCurrentSchema} value={currentSchemaId}>
        {schemas.length > 0 && (
          <ScrollArea maw="100%" w={400} offsetScrollbars>
            <Flex my={10} gap={10}>
              {schemas.map((schema) => (
                <SchemaSettingItem key={schema.id} schema={schema} />
              ))}
            </Flex>
          </ScrollArea>
        )}
      </Chip.Group>
      {schemas.length < SCHEMA_KEYS.length && (
        <Button leftIcon={<FaPlus />} size="xs" onClick={handleAddSchema}>
          Add Schema
        </Button>
      )}
    </Box>
  );
};

export default SchemaSettings;
