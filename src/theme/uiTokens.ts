/** Shared UI tokens — Stage 4 consistency (drawers, palette, motion). */

export const DRAWER_POSITION = "right" as const;

export const DRAWER_TRANSITION = {
	duration: 450,
	transition: "slide-left",
} as const;

export const DRAWER_LEFT_TRANSITION = {
	duration: 450,
	transition: "slide-right",
} as const;

export const DRAWER_BOTTOM_TRANSITION = {
	duration: 450,
	transition: "slide-up",
} as const;

export const UI_CHART = {
	sessions: "#fa5252",
	time: "#4dabf7",
	grid: "rgba(255, 255, 255, 0.08)",
} as const;

export const UI_ACCENT = {
	primary: "#fa5252",
	info: "#74c0fc",
	success: "#51cf66",
	warning: "#ff922b",
} as const;
