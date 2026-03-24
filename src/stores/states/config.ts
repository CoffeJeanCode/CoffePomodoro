import type { Configuration } from "@/models";
import {
	defaultNotification,
	normalizeConfiguration,
} from "@/utils/normalizeConfiguration";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";
import { ALARMS } from "../constants";

export interface ConfigurationState {
	config: Configuration;
	setConfiguration: (newConfig: Configuration) => void;
	resetConfiguration: () => void;
}

const seedConfiguration = normalizeConfiguration({
	notification: {
		...defaultNotification,
		alarm: ALARMS.Micellaneus,
		desktopNotification: Notification.permission === "granted",
		volume: 0.5,
	},
});

export const useConfigState = create<ConfigurationState>()(
	persist(
		(set) => ({
			config: seedConfiguration,
			setConfiguration: (newConfig) =>
				set(() => ({ config: normalizeConfiguration(newConfig) })),
			resetConfiguration: () => set(() => ({ config: seedConfiguration })),
		}),
		{
			name: "config",
			version: storeVersion,
			merge: (persisted, current) => {
				const p = (persisted ?? {}) as Partial<ConfigurationState>;
				return {
					...current,
					...p,
					config: normalizeConfiguration({
						...current.config,
						...(p.config as Partial<Configuration>),
					}),
				};
			},
		},
	),
);
