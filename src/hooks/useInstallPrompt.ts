import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function useInstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [isInstallable, setIsInstallable] = useState(false);
	const [isInstalled, setIsInstalled] = useState(false);

	useEffect(() => {
		const handler = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setIsInstallable(true);
		};

		window.addEventListener("beforeinstallprompt", handler);

		if (window.matchMedia("(display-mode: standalone)").matches) {
			setIsInstalled(true);
		}

		const installedHandler = () => {
			setIsInstalled(true);
			setIsInstallable(false);
			setDeferredPrompt(null);
		};
		window.addEventListener("appinstalled", installedHandler);

		return () => {
			window.removeEventListener("beforeinstallprompt", handler);
			window.removeEventListener("appinstalled", installedHandler);
		};
	}, []);

	const triggerInstall = useCallback(async () => {
		if (!deferredPrompt) return false;
		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		setDeferredPrompt(null);
		setIsInstallable(false);
		return outcome === "accepted";
	}, [deferredPrompt]);

	return { isInstallable, isInstalled, triggerInstall };
}
