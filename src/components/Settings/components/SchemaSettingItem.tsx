import { TimerSchema } from "@/models/schemas";
import { useSchemasState } from "@/stores/states/schema";
import { Button, Chip, CloseButton, Flex, Input, Text } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { FC, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";

interface SchemaSettingItemProps {
  schema: TimerSchema;
}

const SchemaSettingItem: FC<SchemaSettingItemProps> = ({ schema }) => {
  const { currentSchemaId, updateSchema, deleteSchema, setCurrentSchema } =
    useSchemasState();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(schema.title);

  const handleDeleteSchema = () => {
    if (schema.id === currentSchemaId) setCurrentSchema("");
    deleteSchema(schema.id);
  };

  const handleUpdateTitle = () => {
    updateSchema(schema.id, { ...schema, title });
    setIsEditing(false);
  };

  return (
    <Chip
      value={schema.id}
      onClick={() =>
        setCurrentSchema(currentSchemaId === schema.id ? "" : currentSchemaId)
      }
    >
      <Flex
        justify="space-between"
        align="center"
        w="100%"
        title={`${schema["pomodoro"]} min ${schema["short break"]} min ${schema["long break"]} min `}
      >
        {isEditing ? (
          <Input
            size="xs"
            maw={80}
            miw={35}
            value={title}
            variant="unstyled"
            onChange={({ target }) => setTitle(target.value)}
            onKeyDown={getHotkeyHandler([["enter", handleUpdateTitle]])}
            autoFocus
          />
        ) : (
          <Text>{schema.title}</Text>
        )}
        <Flex>
          {isEditing ? (
            <Button
              variant="subtle"
              color="dark"
              size="xs"
              compact
              onClick={handleUpdateTitle}
            >
              <FaCheck />
            </Button>
          ) : (
            <Button
              variant="subtle"
              color="dark"
              size="xs"
              compact
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </Button>
          )}
          <CloseButton onClick={handleDeleteSchema} />
        </Flex>
      </Flex>
    </Chip>
  );
};

export default SchemaSettingItem;
