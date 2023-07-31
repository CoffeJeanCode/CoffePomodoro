import { Configuration, Mode } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { minutesToSeconds } from "../../utils/time.util";
import { ALARMS } from "../constants";

interface ConfigurationState {
	config: Configuration;
	setConfiguration: (newConfig: Configuration) => void;
	resetConfiguration: () => void;
}

const defaultTimers = {
	[Mode.Pomodoro]: minutesToSeconds(25),
	[Mode.ShortBreak]: minutesToSeconds(5),
	[Mode.LongBreak]: minutesToSeconds(10),
};

const initialState: Configuration = {
	timers: defaultTimers,
	notification: {
		alarm: ALARMS["Micellaneus"],
		desktopNofitication: Notification.permission === "granted",
		volume: 0.5,
	},
	behaviur: {
		canAutoPlay: false,
		pomodorosToLongBreak: 4,
	},
};

export const useConfigState = create<ConfigurationState>()(
	persist(
		(set) => ({
			config: {
				...initialState,
			},
			setConfiguration: (newConfig) => set(() => ({ config: { ...newConfig } })),
			resetConfiguration: () => set(() => ({ config: initialState })),
		}),
		{
			name: "config",
		},
	),
);
