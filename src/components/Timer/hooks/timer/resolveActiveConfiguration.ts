import type { Configuration } from "@/models";
import type { TimerSchema } from "@/models/schemas";

export function resolveActiveConfiguration(
	config: Configuration,
	currentSchemaId: string,
	findCurrentSchema: () => TimerSchema | null,
): Configuration {
	return currentSchemaId === "" ? config : (findCurrentSchema() ?? config);
}
