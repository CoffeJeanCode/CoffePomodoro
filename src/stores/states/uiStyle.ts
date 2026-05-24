import { setActiveUIStyleId } from "@/theme/activeStyle";
import { DEFAULT_UI_STYLE, type UIStyleId, UI_STYLES } from "@/theme/uiStyles";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UIStyleState {
	activeStyle: UIStyleId;
	setStyle: (id: UIStyleId) => void;
}

/** Writes structural --ui-* tokens to :root and tags data-ui-style — zero React re-render. */
const applyUIStyle = (id: UIStyleId) => {
	const style = UI_STYLES[id];
	if (!style) return;
	const root = document.documentElement;
	for (const [key, value] of Object.entries(style.vars)) {
		root.style.setProperty(key, value);
	}
	root.setAttribute("data-ui-style", id);
	setActiveUIStyleId(id);
};

/** Migrate legacy style IDs to their ADR-0012 equivalents. */
const migrateStyle = (id: string | null): UIStyleId => {
	if (id && Object.hasOwn(UI_STYLES, id as UIStyleId)) return id as UIStyleId;
	if (id === "ethereal") return "ciberpunk";
	if (id === "mechanical") return "rustico";
	if (id === "brutal") return "minimal";
	return DEFAULT_UI_STYLE;
};

const persisted = localStorage.getItem("ui-style");
const initialStyle = migrateStyle(persisted);
applyUIStyle(initialStyle);

export const useUIStyleState = create<UIStyleState>()(
	persist(
		(set) => ({
			activeStyle: initialStyle,
			setStyle: (id: UIStyleId) => {
				applyUIStyle(id);
				set({ activeStyle: id });
			},
		}),
		{
			name: "ui-style",
			version: 2,
			merge: (persisted, current) => {
				const p = (persisted ?? {}) as Partial<UIStyleState>;
				return {
					...current,
					activeStyle: migrateStyle((p.activeStyle as string) ?? null),
				};
			},
		},
	),
);
