export const showNotification = (
	title: string,
	permission: boolean,
	options?: NotificationOptions,
): void => {
	if (!("Notification" in window)) {
		console.error("This browser does not support desktop notifications.");
		return;
	}

	if (permission) {
		new Notification(title, options);
	} else if (!permission) {
		Notification.requestPermission().then((permission) => {
			if (permission) {
				new Notification(title, options);
			}
		});
	}
};
