import { useBrainDumpState } from "@/stores/states/brainDump";
import { useConfigState } from "@/stores/states/config";
import { useDepthState } from "@/stores/states/depth";
import { useInfoState } from "@/stores/states/info";
import { useSchemasState } from "@/stores/states/schema";
import { useStatsState } from "@/stores/states/stats";
import { useTimerState } from "@/stores/states/timer";

export interface ExportedData {
	version: number;
	exportedAt: string;
	stores: {
		timer: ReturnType<typeof useTimerState.getState>;
		config: ReturnType<typeof useConfigState.getState>;
		info: ReturnType<typeof useInfoState.getState>;
		schemas: ReturnType<typeof useSchemasState.getState>;
		depth: ReturnType<typeof useDepthState.getState>;
		stats: ReturnType<typeof useStatsState.getState>;
		brainDump: ReturnType<typeof useBrainDumpState.getState>;
	};
}

export function exportAllData(): ExportedData {
	return {
		version: 1,
		exportedAt: new Date().toISOString(),
		stores: {
			timer: useTimerState.getState(),
			config: useConfigState.getState(),
			info: useInfoState.getState(),
			schemas: useSchemasState.getState(),
			depth: useDepthState.getState(),
			stats: useStatsState.getState(),
			brainDump: useBrainDumpState.getState(),
		},
	};
}

export function downloadExportedData() {
	const data = exportAllData();
	const json = JSON.stringify(data, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `coffepomo-backup-${new Date().toISOString().slice(0, 10)}.json`;
	a.click();
	URL.revokeObjectURL(url);
}

export function importAllData(json: string): {
	success: boolean;
	error?: string;
} {
	try {
		const data = JSON.parse(json) as ExportedData;
		if (!data.version || !data.stores) {
			return { success: false, error: "Invalid backup format" };
		}

		const { stores } = data;

		if (stores.timer) useTimerState.setState(stores.timer);
		if (stores.config) useConfigState.setState(stores.config);
		if (stores.info) useInfoState.setState(stores.info);
		if (stores.schemas) useSchemasState.setState(stores.schemas);
		if (stores.depth) useDepthState.setState(stores.depth);
		if (stores.stats) useStatsState.setState(stores.stats);
		if (stores.brainDump) useBrainDumpState.setState(stores.brainDump);

		return { success: true };
	} catch (e) {
		return { success: false, error: String(e) };
	}
}
