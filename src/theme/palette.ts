/**
 * Fixed color identity (ADR-0012 revision).
 *
 * Color is NOT a personalization axis: Red/Green/Blue carry semantic meaning
 * (focus / short break / long break) and stay constant everywhere.
 * The structural style (data-ui-style) only changes shape, topology, typography,
 * physics and icon set — never any hue.
 *
 * CSS custom properties for this palette live in tokens-color-root.css.
 * This module provides the JS-accessible constants for PiP and timer utils.
 */

/** Semantic mode colors — constant across every structural style. */
export const MODE_COLORS = {
	work: "#fa5252",
	short: "#40c057",
	long: "#4dabf7",
} as const;

/** Opaque RGB base used to paint the timer ambient surface. */
export const AMBIENT_SURFACE: [number, number, number] = [21, 23, 30];

/**
 * Palette vars injected into PiP windows.
 * Canvas vars (--ui-bg, --ui-surface, etc.) come from the active style's vars.
 */
export const PALETTE_VARS: Record<string, string> = {
	"--color-red": "#fa5252",
	"--color-green": "#40c057",
	"--color-blue": "#4dabf7",
	"--color-red-on": "#ffffff",
	"--color-green-on": "#ffffff",
	"--color-blue-on": "#0b0c10",
	"--color-mode-work": MODE_COLORS.work,
	"--color-mode-short": MODE_COLORS.short,
	"--color-mode-long": MODE_COLORS.long,
	"--color-mode-work-on": "#ffffff",
	"--color-mode-short-on": "#ffffff",
	"--color-mode-long-on": "#0b0c10",
	"--color-accent": MODE_COLORS.work,
	"--color-accent-contrast": "#ffffff",
	"--color-info": "#74c0fc",
	"--color-success": "#51cf66",
	"--color-warning": "#fcc419",
	"--color-border-ink": "#e8ecf4",
	"--color-ring-track": "rgba(255, 255, 255, 0.08)",
};
