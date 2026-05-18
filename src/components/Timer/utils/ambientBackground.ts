import type { Mode } from "@/models";
import { getColorMode, getModeHexColors } from "./timer";

function modePalette(mode: Mode) {
	const base = getColorMode(mode);
	if (base === "red") {
		return {
			cool: { r: 14, g: 18, b: 28 },
			warm: { r: 42, g: 20, b: 26 },
			accent: "#ff6b6b",
		};
	}
	if (base === "green") {
		return {
			cool: { r: 10, g: 26, b: 22 },
			warm: { r: 16, g: 38, b: 30 },
			accent: "#51cf66",
		};
	}
	return {
		cool: { r: 10, g: 18, b: 32 },
		warm: { r: 20, g: 30, b: 48 },
		accent: "#74c0fc",
	};
}

/** Ambient fill for glass panels — same language in normal and fullscreen. */
export function buildAmbientBackground(
	mode: Mode,
	sessionProgressPercent: number,
): string {
	const p = sessionProgressPercent;
	const { cool, warm, accent } = modePalette(mode);

	const t = p / 100;
	const r = Math.round(cool.r + (warm.r - cool.r) * t);
	const g = Math.round(cool.g + (warm.g - cool.g) * t);
	const b = Math.round(cool.b + (warm.b - cool.b) * t);

	const swirlX = 50 + Math.sin(p * 0.08) * 30;
	const swirlY = 50 + Math.cos(p * 0.08) * 30;

	return `
    radial-gradient(ellipse 100% 90% at ${swirlX}% ${swirlY}%, ${accent}30 0%, transparent 58%),
    radial-gradient(ellipse 80% 70% at ${100 - p}% ${p}%, ${accent}18 0%, transparent 52%),
    linear-gradient(165deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${Math.max(0, r - 6)}, ${Math.max(0, g - 6)}, ${Math.max(0, b - 6)}) 100%)
  `;
}

/** Full-viewport immersive background — same language as glass panel but more vibrant. */
export function buildFullscreenBackground(
	mode: Mode,
	sessionProgressPercent: number,
): string {
	const p = sessionProgressPercent;
	const { cool, warm, accent } = modePalette(mode);

	const t = p / 100;
	const r = Math.round(cool.r + (warm.r - cool.r) * t);
	const g = Math.round(cool.g + (warm.g - cool.g) * t);
	const b = Math.round(cool.b + (warm.b - cool.b) * t);

	const swirlX = 50 + Math.sin(p * 0.06) * 35;
	const swirlY = 40 + Math.cos(p * 0.06) * 30;

	return `
    radial-gradient(ellipse 100% 90% at ${swirlX}% ${swirlY}%, ${accent}55 0%, transparent 60%),
    radial-gradient(ellipse 80% 70% at ${100 - p}% ${p}%, ${accent}30 0%, transparent 55%),
    radial-gradient(ellipse 60% 50% at 15% 75%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    linear-gradient(160deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${Math.max(0, r - 10)}, ${Math.max(0, g - 10)}, ${Math.max(0, b - 10)}) 100%)
  `;
}
