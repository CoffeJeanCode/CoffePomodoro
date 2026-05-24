/**
 * Fixed color identity (ADR-0012 V3).
 *
 * Semantic mode colors (R/G/B) MUTATE per structural style for aesthetic
 * cohesion. The JS constants below are DEFAULTS matching the ambient-ai style.
 * The actual colors at runtime come from CSS custom properties
 * (--color-red/green/blue) injected by applyUIStyle().
 *
 * PiP and timer utils call getModeAccent() which reads from the CSS live value
 * when possible, falling back to these defaults.
 */

/** Default mode colors — matches ambient-ai style. Overridden by CSS vars at runtime. */
export const MODE_COLORS = {
	work: "#ff4d6d",
	short: "#51e898",
	long: "#6ea8fe",
} as const;

/** Opaque RGB base used to paint the timer ambient surface. */
export const AMBIENT_SURFACE: [number, number, number] = [5, 5, 10];

/**
 * Palette vars injected into PiP windows.
 * Canvas vars come from the active style's vars, so only color tokens are
 * mirrored here.
 */
export const PALETTE_VARS: Record<string, string> = {
	"--color-red": "#ff4d6d",
	"--color-green": "#51e898",
	"--color-blue": "#6ea8fe",
	"--color-red-on": "#ffffff",
	"--color-green-on": "#05050a",
	"--color-blue-on": "#05050a",
	"--color-mode-work": "var(--color-red)",
	"--color-mode-short": "var(--color-green)",
	"--color-mode-long": "var(--color-blue)",
	"--color-mode-work-on": "var(--color-red-on)",
	"--color-mode-short-on": "var(--color-green-on)",
	"--color-mode-long-on": "var(--color-blue-on)",
	"--color-accent": "var(--color-red)",
	"--color-accent-contrast": "var(--color-red-on)",
	"--color-info": "var(--color-blue)",
	"--color-success": "var(--color-green)",
	"--color-warning": "#fcc419",
	"--color-border-ink": "#e8ecf4",
	"--color-ring-track": "rgba(255, 255, 255, 0.08)",
};
