import type { Mode } from "@/models";
import { AMBIENT_SURFACE } from "@/theme/palette";
import { getModeAccent } from "./timer";

function hexToRgb(hex: string): [number, number, number] {
	const n = Number.parseInt(hex.slice(1), 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba([r, g, b]: [number, number, number], a: number): string {
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Ambient fill for glass panels — derived from the active theme surface + mode accent. */
export function buildAmbientBackground(
	mode: Mode,
	sessionProgressPercent: number,
): string {
	const p = sessionProgressPercent;
	const [r, g, b] = AMBIENT_SURFACE;
	const accent = hexToRgb(getModeAccent(mode));

	const t = p / 100;
	const glow = 0.16 + 0.22 * t;
	const glowFar = 0.08 + 0.12 * t;

	const swirlX = 50 + Math.sin(p * 0.08) * 30;
	const swirlY = 50 + Math.cos(p * 0.08) * 30;

	return `
    radial-gradient(ellipse 100% 90% at ${swirlX}% ${swirlY}%, ${rgba(accent, glow)} 0%, transparent 58%),
    radial-gradient(ellipse 80% 70% at ${100 - p}% ${p}%, ${rgba(accent, glowFar)} 0%, transparent 52%),
    linear-gradient(165deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${Math.max(0, r - 8)}, ${Math.max(0, g - 8)}, ${Math.max(0, b - 8)}) 100%)
  `;
}

/** Full-viewport immersive background — same language as the panel, more vibrant. */
export function buildFullscreenBackground(
	mode: Mode,
	sessionProgressPercent: number,
): string {
	const p = sessionProgressPercent;
	const [r, g, b] = AMBIENT_SURFACE;
	const accent = hexToRgb(getModeAccent(mode));

	const t = p / 100;
	const glow = 0.28 + 0.3 * t;
	const glowFar = 0.16 + 0.18 * t;

	const swirlX = 50 + Math.sin(p * 0.06) * 35;
	const swirlY = 40 + Math.cos(p * 0.06) * 30;

	return `
    radial-gradient(ellipse 100% 90% at ${swirlX}% ${swirlY}%, ${rgba(accent, glow)} 0%, transparent 60%),
    radial-gradient(ellipse 80% 70% at ${100 - p}% ${p}%, ${rgba(accent, glowFar)} 0%, transparent 55%),
    linear-gradient(160deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${Math.max(0, r - 12)}, ${Math.max(0, g - 12)}, ${Math.max(0, b - 12)}) 100%)
  `;
}
