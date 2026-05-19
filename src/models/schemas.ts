import type { Configuration } from "./config";
import type { DepthPresetKey } from "./depth";

export interface TimerSchema extends Configuration {
	id: string;
	title: string;
	presetKey?: DepthPresetKey;
}

export interface Schemas {
	schemas: TimerSchema[];
	currentSchemaId: string;
}
