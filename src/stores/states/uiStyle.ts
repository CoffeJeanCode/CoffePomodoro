import { setActiveUIStyleId } from "@/theme/activeStyle";
import { DEFAULT_UI_STYLE, type UIStyleId, UI_STYLES } from "@/theme/uiStyles";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UIStyleState {
	activeStyle: UIStyleId;
	setStyle: (id: UIStyleId) => void;
}

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

const migrateStyle = (id: string | null): UIStyleId => {
	if (id && Object.hasOwn(UI_STYLES, id as UIStyleId)) return id as UIStyleId;
	if (id === "rustico") return "ambient-ai";
	if (id === "ethereal") return "ambient-ai";
	if (id === "mechanical") return "ciberpunk";
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
			version: 3,
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
