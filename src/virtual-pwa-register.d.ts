declare module "virtual:pwa-register" {
	export interface RegisterSWOptions {
		immediate?: boolean;
		onNeedRefresh?: () => void;
		onOfflineReady?: () => void;
		onRegistered?: (
			registration: ServiceWorkerRegistration | undefined,
		) => void;
		onRegisteredError?: (error: unknown) => void;
	}

	export function registerSW(
		options?: RegisterSWOptions,
	): (reloadPage?: boolean) => void;
}
