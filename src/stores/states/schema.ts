import {
	DEPTH_PRESETS,
	DEPTH_PRESET_ORDER,
	depthPresetTitle,
} from "@/models/depth";
import type { Schemas, TimerSchema } from "@/models/schemas";
import { createId } from "@/utils/extra.utils";
import { normalizeTimerSchema } from "@/utils/normalizeConfiguration";
import { indexedDBStorage } from "@/utils/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeVersion } from "../config";
import { ALARMS } from "../constants";

export interface SchemasState extends Schemas {
	addSchema: (schema: Omit<TimerSchema, "id">) => void;
	updateSchema: (id: string, schema: TimerSchema) => void;
	deleteSchema: (id: string) => void;
	setCurrentSchema: (id: string) => void;
	findCurrentSchema: () => TimerSchema | null;
	updateCurrentSchema: (updatedSchema: TimerSchema) => void;
}

const NOTIFICATION_BY_PRESET = {
	deep: { alarm: ALARMS.Rise, desktopNotification: true, volume: 70 },
	sustained: {
		alarm: ALARMS.Micellaneus,
		desktopNotification: true,
		volume: 50,
	},
	quick: { alarm: ALARMS.Shake, desktopNotification: false, volume: 30 },
} as const;

const defaultSchemasRaw: Omit<TimerSchema, "id">[] = DEPTH_PRESET_ORDER.map(
	(key) => {
		const preset = DEPTH_PRESETS[key];
		return {
			title: depthPresetTitle(preset),
			presetKey: key,
			timers: preset.timers,
			notification: NOTIFICATION_BY_PRESET[key],
			behavior: {
				canAutoPlay: false,
				...preset.behavior,
			},
		};
	},
);

const defaultSchemas: TimerSchema[] = defaultSchemasRaw.map((s) =>
	normalizeTimerSchema({ ...s, id: createId() }),
);

const LEGACY_SCHEMA_TITLES = ["Work Session", "Reading", "Study"] as const;

function isLegacySchemaSet(schemas: TimerSchema[]): boolean {
	return (
		schemas.length === 3 &&
		schemas.every((s, i) => s.title === LEGACY_SCHEMA_TITLES[i])
	);
}

export const useSchemasState = create<SchemasState>()(
	persist(
		(set, get) => ({
			schemas: defaultSchemas,
			currentSchemaId: "",
			addSchema: (schema) => {
				set(() => ({
					schemas: [
						normalizeTimerSchema({ ...schema, id: createId() }),
						...get().schemas,
					],
				}));
			},
			updateSchema: (id, updatedSchema) => {
				set(() => ({
					schemas: get().schemas.map((schema) =>
						schema.id === id
							? normalizeTimerSchema({ ...schema, ...updatedSchema })
							: schema,
					),
				}));
			},
			deleteSchema: (id) => {
				set(() => ({
					schemas: get().schemas.filter((schema) => schema.id !== id),
				}));
			},
			setCurrentSchema: (id) => {
				set(() => ({
					currentSchemaId: id,
				}));
			},
			findCurrentSchema: () =>
				get().schemas.find((schema) => schema.id === get().currentSchemaId) ||
				null,
			updateCurrentSchema: (updatedSchema) =>
				get().updateSchema(get().currentSchemaId, updatedSchema),
		}),
		{
			name: "schemas",
			version: storeVersion,
			storage: createJSONStorage(() => indexedDBStorage),
			merge: (persisted, current) => {
				const p = (persisted ?? {}) as Partial<SchemasState>;
				let raw = p.schemas ?? current.schemas;
				if (isLegacySchemaSet(raw)) {
					raw = defaultSchemas;
				}
				return {
					...current,
					...p,
					schemas: raw.map((s) => normalizeTimerSchema(s as TimerSchema)),
					currentSchemaId: p.currentSchemaId ?? current.currentSchemaId,
				};
			},
		},
	),
);
