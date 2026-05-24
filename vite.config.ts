import path from "path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.svg",
				"favicon-break.svg",
				"icons/apple-touch-icon-180x180.png",
			],
			manifest: {
				name: "Coffe Pomodoro",
				short_name: "CoffePomo",
				description:
					"Focus & mindfulness timer. Deep work sessions with Brain Dump — no cloud, no distractions, fully offline.",
				theme_color: "#0a0e14",
				background_color: "#0a0e14",
				display: "standalone",
				orientation: "portrait",
				scope: "/",
				start_url: "/",
				categories: ["productivity", "utilities"],
				icons: [
					{
						src: "icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "icons/maskable-icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "icons/maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,mp3,aac,woff2,ttf}"],
				navigateFallback: "offline.html",
				navigateFallbackDenylist: [/^\/api/],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-stylesheets",
							expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
							cacheableResponse: { statuses: [0, 200] },
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-webfonts",
							expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
							cacheableResponse: { statuses: [0, 200] },
						},
					},
				],
			},
			devOptions: { enabled: false },
		}),
	],
	resolve: {
		alias: { "@": path.resolve(__dirname, "./src") },
	},
	server: {
		host: true,
		watch: {
			usePolling: true,
		},
	},
});