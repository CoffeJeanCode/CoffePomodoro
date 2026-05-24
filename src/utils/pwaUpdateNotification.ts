type UpdateCallback = (reloadPage?: boolean) => void;

export function showUpdateNotification(updateSW: UpdateCallback) {
	if (document.hidden) return;

	const shouldUpdate = window.confirm(
		"A new version of CoffePomodoro is available. Update now for the latest improvements?",
	);

	if (shouldUpdate) {
		updateSW(true);
	}
}
