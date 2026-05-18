import type { Configuration } from "@/models";
import type { TimerSchema } from "@/models/schemas";
import { useSchemasState, useTimerState } from "@/stores";
import { SCHEMA_KEYS } from "@/stores/constants";
import { Box, Button, Chip, ScrollArea, Title } from "@mantine/core";
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
		<Box w="100%" style={{ minWidth: 0 }}>
			<Title order={5} size="sm" c="dimmed" mb="xs">
				Presets
			</Title>
			{schemas.length > 0 && (
				<ScrollArea
					w="100%"
					type="always"
					offsetScrollbars
					scrollbarSize={8}
					styles={{ viewport: { paddingBottom: 4 } }}
				>
					<Chip.Group
						onChange={(value) => handleSetCurrentSchema(value as string)}
						value={currentSchemaId}
						styles={{
							root: {
								flexWrap: "nowrap",
								width: "max-content",
								gap: "var(--mantine-spacing-sm)",
							},
						}}
					>
						{schemas.map((schema) => (
							<SchemaSettingItem key={schema.id} schema={schema} />
						))}
					</Chip.Group>
				</ScrollArea>
			)}
			{schemas.length < SCHEMA_KEYS.length && (
				<Button
					leftSection={<FaPlus />}
					size="xs"
					mt="sm"
					onClick={handleAddSchema}
				>
					Add Schema
				</Button>
			)}
		</Box>
	);
};

export default SchemaSettings;
