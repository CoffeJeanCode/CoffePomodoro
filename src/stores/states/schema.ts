import { Mode } from "@/models";
import type { Schemas, TimerSchema } from "@/models/schemas";
import { createId } from "@/utils/extra.utils";
import { minutesToSeconds } from "@/utils/time.util";
import { create } from "zustand";
import { persist } from "zustand/middleware";
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

const defaultSchemas: TimerSchema[] = [
	{
		id: createId(),
		title: "Work Session",
		timers: {
			[Mode.Pomodoro]: minutesToSeconds(25),
			[Mode.ShortBreak]: minutesToSeconds(5),
			[Mode.LongBreak]: minutesToSeconds(15),
		},
		notification: {
			alarm: ALARMS.Rise,
			desktopNotification: true,
			volume: 70,
		},
		behaviur: {
			canAutoPlay: true,
			pomodorosToLongBreak: 4,
		},
	},
	{
		id: createId(),
		title: "Reading",
		timers: {
			[Mode.Pomodoro]: minutesToSeconds(30),
			[Mode.ShortBreak]: minutesToSeconds(7),
			[Mode.LongBreak]: minutesToSeconds(20),
		},
		notification: {
			alarm: ALARMS.Micellaneus,
			desktopNotification: true,
			volume: 50,
		},
		behaviur: {
			canAutoPlay: false,
			pomodorosToLongBreak: 3,
		},
	},
	{
		id: createId(),
		title: "Study",
		timers: {
			[Mode.Pomodoro]: minutesToSeconds(45),
			[Mode.ShortBreak]: minutesToSeconds(10),
			[Mode.LongBreak]: minutesToSeconds(20),
		},
		notification: {
			alarm: ALARMS.Shake,
			desktopNotification: false,
			volume: 30,
		},
		behaviur: {
			canAutoPlay: true,
			pomodorosToLongBreak: 5,
		},
	},
];
export const useSchemasState = create<SchemasState>()(
	persist(
		(set, get) => ({
			schemas: defaultSchemas,
			currentSchemaId: "",
			addSchema: (schema) => {
				set(() => ({
					schemas: [{ ...schema, id: createId() }, ...get().schemas],
				}));
			},
			updateSchema: (id, updatedSchema) => {
				set(() => ({
					schemas: get().schemas.map((schema) =>
						schema.id === id ? { ...schema, ...updatedSchema } : schema,
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
		},
	),
);
