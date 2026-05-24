import type { Configuration } from "@/models";
import { DEPTH_PRESETS } from "@/models/depth";
import type { TimerSchema } from "@/models/schemas";
import { useDepthState, useSchemasState, useTimerState } from "@/stores";
import { SCHEMA_KEYS } from "@/stores/constants";
import { secondsToMinutes } from "@/utils/time.util";
import { Box, Button, Flex, Input, Select, Text, Title } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import type { FC } from "react";
import { useState } from "react";
import { FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

interface Props {
	configuration: Configuration | TimerSchema;
	setConfigValue: (
		path: string,
		value: Configuration[keyof Configuration],
	) => void;
}

const SchemaSettings: FC<Props> = ({ configuration }) => {
	const {
		schemas,
		currentSchemaId,
		addSchema,
		setCurrentSchema,
		updateSchema,
		deleteSchema,
	} = useSchemasState();
	const setActivePreset = useDepthState((s) => s.setActivePreset);
	const resetForNext = useTimerState((state) => state.resetForNext);
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState("");

	const current = schemas.find((s) => s.id === currentSchemaId);

	const handleAddSchema = () => {
		addSchema({
			...configuration,
			title: "New Schema",
		});
	};

	const handleSetCurrentSchema = (id: string | null) => {
		if (!id) {
			resetForNext();
			setCurrentSchema("");
			return;
		}
		const selected = schemas.find((s) => s.id === id);
		if (selected?.presetKey) setActivePreset(selected.presetKey);
		resetForNext();
		setCurrentSchema(id);
	};

	const handleDeleteSchema = () => {
		if (!current) return;
		if (current.id === currentSchemaId) setCurrentSchema("");
		deleteSchema(current.id);
	};

	const handleStartEdit = () => {
		if (!current) return;
		setEditTitle(current.title);
		setIsEditing(true);
	};

	const handleSaveTitle = () => {
		if (!current) return;
		updateSchema(current.id, { ...current, title: editTitle });
		setIsEditing(false);
	};

	const options = schemas.map((s) => {
		const brief = s.presetKey ? DEPTH_PRESETS[s.presetKey].description : "";
		return {
			value: s.id,
			label: brief ? `${s.title} — ${brief}` : s.title,
		};
	});

	return (
		<Box w="100%" style={{ minWidth: 0 }}>
			<Title order={5} size="sm" c="dimmed" mb="xs">
				Presets
			</Title>

			<Select
				data={options}
				value={currentSchemaId || null}
				onChange={handleSetCurrentSchema}
				placeholder="Select a preset…"
				clearable
				searchable
				nothingFoundMessage="No presets found"
				comboboxProps={{ withinPortal: false }}
			/>

			{current && (
				<Flex
					mt="sm"
					p="xs"
					gap="xs"
					align="center"
					justify="space-between"
					style={(theme) => ({
						borderRadius: theme.radius.sm,
						background: isEditing
							? "var(--mantine-color-dark-6)"
							: "var(--ui-glass-bg)",
						border: isEditing
							? "1px solid var(--mantine-color-red-8)"
							: "1px solid transparent",
						transition: "background 150ms, border-color 150ms",
					})}
				>
					<Flex align="center" gap="xs" style={{ flex: 1, minWidth: 0 }}>
						{isEditing ? (
							<Input
								size="xs"
								maw={140}
								value={editTitle}
								onChange={(evt) => setEditTitle(evt.target.value)}
								onKeyDown={getHotkeyHandler([["enter", handleSaveTitle]])}
								autoFocus
								placeholder="Schema name"
							/>
						) : (
							<Box style={{ minWidth: 0 }}>
								<Text size="sm" fw={500} truncate="end">
									{current.title}
								</Text>
								{current.presetKey && (
									<Text size="xs" c="dimmed" truncate="end">
										{DEPTH_PRESETS[current.presetKey].description}
									</Text>
								)}
								<Text size="xs" c="dimmed">
									{secondsToMinutes(current.timers.pomodoro)}m &middot;{" "}
									{secondsToMinutes(current.timers["short break"])}m &middot;{" "}
									{secondsToMinutes(current.timers["long break"])}m
								</Text>
							</Box>
						)}
					</Flex>

					<Flex gap={2} style={{ flexShrink: 0 }}>
						{isEditing ? (
							<Button
								variant="subtle"
								color="gray"
								size="compact-sm"
								onClick={handleSaveTitle}
							>
								<FaCheck />
							</Button>
						) : (
							<Button
								variant="subtle"
								color="gray"
								size="compact-sm"
								onClick={handleStartEdit}
							>
								<FaEdit />
							</Button>
						)}
						<Button
							variant="subtle"
							color="gray"
							size="compact-sm"
							aria-label="Delete preset"
							onClick={handleDeleteSchema}
						>
							<FaTrash />
						</Button>
					</Flex>
				</Flex>
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
