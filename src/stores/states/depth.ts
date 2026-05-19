import type { DepthPresetKey } from "@/models/depth";
import { DEFAULT_DEPTH_PRESET } from "@/models/depth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

interface DepthState {
	activePreset: DepthPresetKey;
	setActivePreset: (key: DepthPresetKey) => void;
	resetDepth: () => void;
}

export const useDepthState = create<DepthState>()(
	persist(
		(set) => ({
			activePreset: DEFAULT_DEPTH_PRESET,
			setActivePreset: (activePreset) => set({ activePreset }),
			resetDepth: () => set({ activePreset: DEFAULT_DEPTH_PRESET }),
		}),
		{
			name: "depth",
			version: storeVersion,
			migrate: (persisted, version) => {
				if (version < storeVersion) {
					return { activePreset: DEFAULT_DEPTH_PRESET };
				}
				const state = persisted as { activePreset?: DepthPresetKey };
				const valid: DepthPresetKey[] = ["deep", "sustained", "quick"];
				if (!state.activePreset || !valid.includes(state.activePreset)) {
					return { activePreset: DEFAULT_DEPTH_PRESET };
				}
				return state;
			},
		},
	),
);
