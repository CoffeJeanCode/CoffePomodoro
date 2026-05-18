import type { TimerSchema } from "@/models/schemas";
import { useSchemasState } from "@/stores/states/schema";
import { secondsToMinutes } from "@/utils/time.util";
import { Box, Button, Chip, CloseButton, Flex, Input, Text } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { type FC, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";

interface SchemaSettingItemProps {
	schema: TimerSchema;
}

const SchemaSettingItem: FC<SchemaSettingItemProps> = ({ schema }) => {
	const { timers, id } = schema;
	const { currentSchemaId, updateSchema, deleteSchema, setCurrentSchema } =
		useSchemasState();
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(schema.title);

	const handleDeleteSchema = () => {
		if (id === currentSchemaId) setCurrentSchema("");
		deleteSchema(id);
	};

	const handleUpdateTitle = () => {
		updateSchema(id, { ...schema, title });
		setIsEditing(false);
	};

	const pomodoro = secondsToMinutes(timers.pomodoro);
	const shortBreak = secondsToMinutes(timers["short break"]);
	const longBreak = secondsToMinutes(timers["long break"]);

	return (
		<Chip
			value={schema.id}
			style={{ flexShrink: 0 }}
			onClick={() =>
				setCurrentSchema(currentSchemaId === id ? "" : currentSchemaId)
			}
		>
			<Flex direction="column" gap={2} style={{ minWidth: 100 }}>
				<Flex justify="space-between" align="center" w="100%">
					{isEditing ? (
						<Input
							size="xs"
							maw={80}
							miw={35}
							value={title}
							variant="unstyled"
							onChange={(evt) => setTitle(evt.target.value)}
							onKeyDown={getHotkeyHandler([["enter", handleUpdateTitle]])}
							autoCapitalize="on"
							autoFocus
						/>
					) : (
						<Text size="sm" fw={500}>
							{title}
						</Text>
					)}
					<Flex ml={6} gap={2}>
						{isEditing ? (
							<Button
								variant="subtle"
								color="gray"
								size="compact-sm"
								onClick={handleUpdateTitle}
							>
								<FaCheck />
							</Button>
						) : (
							<Button
								variant="subtle"
								color="gray"
								size="compact-sm"
								onClick={() => setIsEditing(true)}
							>
								<FaEdit />
							</Button>
						)}
						<CloseButton onClick={handleDeleteSchema} />
					</Flex>
				</Flex>
				<Box style={{ opacity: 0.6 }}>
					<Text size="xs" c="dimmed">
						{pomodoro}m &middot; {shortBreak}m &middot; {longBreak}m
					</Text>
				</Box>
			</Flex>
		</Chip>
	);
};

export default SchemaSettingItem;
