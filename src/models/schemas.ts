import type { UIStyleId } from "@/theme/uiStyles";
import type { Configuration } from "./config";
import type { DepthPresetKey } from "./depth";

/** Look saved with a preset: the structural style (shape axis). Color is fixed. */
export interface Appearance {
	uiStyle: UIStyleId;
}

export interface TimerSchema extends Configuration {
	id: string;
	title: string;
	presetKey?: DepthPresetKey;
	/** Optional saved look applied when this preset is selected. */
	appearance?: Appearance;
}

export interface Schemas {
	schemas: TimerSchema[];
	currentSchemaId: string;
}
