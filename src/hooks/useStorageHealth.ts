import { useCallback, useEffect, useState } from "react";

export function useStorageHealth() {
	const [healthy, setHealthy] = useState(true);

	const check = useCallback(async () => {
		try {
			const testKey = "__pwa_storage_check__";
			const { indexedDBStorage } = await import("@/utils/storage");
			await indexedDBStorage.setItem(testKey, "ok");
			const result = await indexedDBStorage.getItem(testKey);
			await indexedDBStorage.removeItem(testKey);
			setHealthy(result === "ok");
		} catch {
			setHealthy(false);
		}
	}, []);

	useEffect(() => {
		check();
	}, [check]);

	return { healthy, recheck: check };
}
