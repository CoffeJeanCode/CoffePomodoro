import { useSchemasState } from "@/stores/states/schema";
import { useUIStyleState } from "@/stores/states/uiStyle";
import type { UIStyleId } from "@/theme/uiStyles";
import { useEffect } from "react";

/**
 * Structural style control. When a preset is active the chosen style is also
 * persisted into that preset's `appearance`, so the look travels with the preset;
 * otherwise it only updates the global default. Color is fixed and never changes.
 */
export function useAppearance() {
	const { activeStyle, setStyle } = useUIStyleState();
	const currentSchemaId = useSchemasState((s) => s.currentSchemaId);
	const findCurrentSchema = useSchemasState((s) => s.findCurrentSchema);
	const updateCurrentSchema = useSchemasState((s) => s.updateCurrentSchema);

	const boundToPreset = currentSchemaId !== "";

	const setUIStyle = (id: UIStyleId) => {
		setStyle(id);
		if (!boundToPreset) return;
		const current = findCurrentSchema();
		if (current)
			updateCurrentSchema({ ...current, appearance: { uiStyle: id } });
	};

	return { activeStyle, boundToPreset, setUIStyle };
}

/** Applies a preset's saved style whenever the selected preset changes. */
export function useApplyPresetAppearance() {
	const currentSchemaId = useSchemasState((s) => s.currentSchemaId);
	const findCurrentSchema = useSchemasState((s) => s.findCurrentSchema);
	const setStyle = useUIStyleState((s) => s.setStyle);

	// biome-ignore lint/correctness/useExhaustiveDependencies: apply only on preset switch
	useEffect(() => {
		const schema = findCurrentSchema();
		if (schema?.appearance) setStyle(schema.appearance.uiStyle);
	}, [currentSchemaId]);
}
