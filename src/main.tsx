import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/fonts.css";
import "@/styles/app.css";
import App from "./App";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
	onNeedRefresh() {
		if (document.hidden) return;
		import("@/utils/pwaUpdateNotification").then(
			({ showUpdateNotification }) => {
				showUpdateNotification(updateSW);
			},
		);
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
