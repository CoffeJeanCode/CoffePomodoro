import type { Configuration } from "@/models";
import type { TimerSchema } from "@/models/schemas";
import { useSchemasState, useTimerState } from "@/stores";
import { SCHEMA_KEYS } from "@/stores/constants";
import { Box, Button, Chip, Flex, ScrollArea, Title } from "@mantine/core";
import type { FC } from "react";
import { FaPlus } from "react-icons/fa";
import SchemaSettingItem from "./components/SchemaSettingItem";

interface Props {
	configuration: Configuration | TimerSchema;
	// biome-ignore lint: romelint/suspicious/noExplicitAny
	setConfigValue: (path: string, value: any) => void;
}

const SchemaSettings: FC<Props> = ({ configuration }) => {
	const { schemas, currentSchemaId, addSchema, setCurrentSchema } =
		useSchemasState();
	const resetForNext = useTimerState((state) => state.resetForNext);

	const handleAddSchema = () => {
		addSchema({
			...configuration,
			title: "New Schema",
		});
	};

	const handleSetCurrentSchema = (id: string) => {
		resetForNext();
		setCurrentSchema(id);
	};

	return (
		<Box>
			<Title order={3} size={25}>
				Schemas
			</Title>
			<Chip.Group
				onChange={(value) => handleSetCurrentSchema(value as string)}
				value={currentSchemaId}
			>
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
				<Button leftSection={<FaPlus />} size="xs" onClick={handleAddSchema}>
					Add Schema
				</Button>
			)}
		</Box>
	);
};

export default SchemaSettings;
