export const showNotification = (
  title: string,
  permission: boolean,
  options?: NotificationOptions & { data?: { url?: string } }
): void => {
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notifications.");
    return;
  }

  const notify = () => {
    const notification = new Notification(title, {
      ...options,
      data: {
        url: options?.data?.url || "/" // where to open when clicked
      }
    });

    notification.onclick = () => {
      // This only works if the tab is already open
      window.focus();
      window.location.href = notification.data?.url || "/";
    };
  };

  if (permission === true) {
    notify();
  } else {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") notify();
    });
  }
};