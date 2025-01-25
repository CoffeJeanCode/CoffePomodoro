import type { TimerSchema } from "@/models/schemas";
import { useSchemasState } from "@/stores/states/schema";
import { Button, Chip, CloseButton, Flex, Input, Text } from "@mantine/core";
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

	return (
		<Chip
			value={schema.id}
			onClick={() =>
				setCurrentSchema(currentSchemaId === id ? "" : currentSchemaId)
			}
		>
			<Flex
				justify="space-between"
				align="center"
				w="100%"
				title={`${timers["pomodoro"]} min ${timers["short break"]} min ${timers["long break"]} min `}
			>
				{isEditing ? (
					<Input
						size="xs"
						maw={80}
						miw={35}
						value={title}
						variant="unstyled"
						onChange={(evt) => setTitle(evt.target.value)}
						onKeyDown={getHotkeyHandler([["enter", handleUpdateTitle]])}
						autoFocus
					/>
				) : (
					<Text>{title}</Text>
				)}
				<Flex ml={10}>
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
		</Chip>
	);
};

export default SchemaSettingItem;
