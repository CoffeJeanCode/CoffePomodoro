import { getDate } from "@/utils/time.util";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

interface ShutdownState {
	/** Whether the workday has been ritually closed (interface locked). */
	isShutDown: boolean;
	/** Day (YYYY-MM-DD) the shutdown happened, so it auto-clears next day. */
	shutDownDate: string;
	shutDown: () => void;
	clearShutdown: () => void;
}

export const useShutdownState = create<ShutdownState>()(
	persist(
		(set) => ({
			isShutDown: false,
			shutDownDate: "",
			shutDown: () =>
				set({ isShutDown: true, shutDownDate: getDate(new Date()) }),
			clearShutdown: () => set({ isShutDown: false, shutDownDate: "" }),
		}),
		{
			name: "shutdown",
			version: storeVersion,
		},
	),
);
