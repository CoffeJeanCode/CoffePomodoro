import type { Configuration } from "@/models";
import type { TimerSchema } from "@/models/schemas";
import { equals } from "ramda";

/** Deep equality for settings draft vs persisted baseline. */
export function configurationEquals(
	a: Configuration | TimerSchema,
	b: Configuration | TimerSchema,
): boolean {
	return equals(a, b);
}
