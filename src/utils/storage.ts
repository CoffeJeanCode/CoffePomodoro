const DB_NAME = "coffepomodoro";
const DB_VERSION = 1;

const createDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains("state")) {
				db.createObjectStore("state");
			}
		};
	});
};

const dbPromise = createDB();

export const indexedDBStorage = {
	getItem: async (name: string): Promise<string | null> => {
		const db = await dbPromise;
		return new Promise((resolve) => {
			const transaction = db.transaction("state", "readonly");
			const store = transaction.objectStore("state");
			const request = store.get(name);

			request.onsuccess = () => {
				resolve(request.result ?? null);
			};
			request.onerror = () => {
				resolve(null);
			};
		});
	},

	setItem: async (name: string, value: string): Promise<void> => {
		const db = await dbPromise;
		return new Promise((resolve, reject) => {
			const transaction = db.transaction("state", "readwrite");
			const store = transaction.objectStore("state");
			const request = store.put(value, name);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	},

	removeItem: async (name: string): Promise<void> => {
		const db = await dbPromise;
		return new Promise((resolve, reject) => {
			const transaction = db.transaction("state", "readwrite");
			const store = transaction.objectStore("state");
			const request = store.delete(name);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	},
};
