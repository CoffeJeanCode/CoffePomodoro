export type UIStyleId = "ciberpunk" | "ambient-ai" | "minimal";

export interface UIStyleDefinition {
	id: UIStyleId;
	label: string;
	description: string;
	icon: string;
	/**
	 * All tokens injected to :root via applyUIStyle().
	 * Includes structural vars AND per-style semantic color mutations.
	 */
	vars: Record<string, string>;
}

/**
 * Shape Language Engine V3 (ADR-0012 revision final).
 *
 * Three ecosystems that make the app feel like three different softwares:
 *   Ciberpunk  — Industrial HUD, rigid, mechanical, glitch
 *   Ambient AI — Glassmorphism, fluid, breathing, chime sounds
 *   Minimal    — Wireframe black, snappy, surgical, dry click
 *
 * Semantic mode colors (R/G/B) MUTATE per style for aesthetic cohesion,
 * but their meaning (Work/Short/Long) NEVER changes.
 */
export const UI_STYLES: Record<UIStyleId, UIStyleDefinition> = {
	ciberpunk: {
		id: "ciberpunk",
		label: "Ciberpunk",
		description:
			"Industrial HUD. Rejilla oscura, biselado, sombra offset, mecánico.",
		icon: "⬡",
		vars: {
			/* ── Semantic colors (desaturated, high-contrast on dark) ── */
			"--color-red": "#e63c3c",
			"--color-green": "#3daa5c",
			"--color-blue": "#4a9fe5",
			"--color-red-on": "#ffffff",
			"--color-green-on": "#ffffff",
			"--color-blue-on": "#ffffff",

			/* ── Lienzo ── */
			"--ui-bg": "#0a0a0c",
			"--ui-surface": "#1a1c20",
			"--ui-surface-2": "#22252a",
			"--ui-surface-border": "rgba(255, 255, 255, 0.08)",
			"--ui-text": "#d8dce6",
			"--ui-text-muted": "#5a6878",
			"--ui-texture": "none",
			"--ui-bg-pattern":
				"radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",

			/* ── Geometría ── */
			"--ui-radius": "0px",
			"--ui-radius-sm": "0px",
			"--ui-radius-pill": "0px",
			"--ui-clip":
				"polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))",
			"--ui-border-width": "2px",
			"--ui-border-style": "solid",
			"--ui-border-color": "#000000",

			/* ── Topología ── */
			"--ui-shadow": "4px 4px 0px #000000",
			"--ui-shadow-sm": "3px 3px 0px #000000",
			"--ui-shadow-pressed": "0px 0px 0px #000000",
			"--ui-blur": "none",
			"--ui-surface-alpha": "100%",
			"--ui-surface-alpha-strong": "100%",

			/* ── Accent mode ── */
			"--ui-accent-fill": "none",
			"--ui-accent-border": "none",
			"--ui-accent-glow": "none",

			/* ── Tipografía ── */
			"--ui-font-family":
				'"Fira Code", "Cascadia Mono", "JetBrains Mono", ui-monospace, monospace',
			"--ui-font-display":
				'"Fira Code", "Cascadia Mono", "JetBrains Mono", ui-monospace, monospace',
			"--ui-letter-spacing": "0.06em",
			"--ui-text-transform": "uppercase",

			/* ── Cinética ── */
			"--ui-duration": "0.1s",
			"--ui-duration-slow": "0.18s",
			"--ui-ease": "steps(3, end)",
			"--ui-spring-ease": "steps(2, end)",
			"--ui-spring-duration": "0.08s",
			"--ui-press-transform": "translate(3px, 3px)",

			/* ── Iconos ── */
			"--ui-icon-set": "hud",
		},
	},
	"ambient-ai": {
		id: "ambient-ai",
		label: "Ambient AI",
		description:
			"Glassmorphism, fluido, respirante. Brillo ambiental, curvas, spring physics.",
		icon: "✦",
		vars: {
			/* ── Semantic colors (vibrant, luminous, saturated) ── */
			"--color-red": "#ff4d6d",
			"--color-green": "#51e898",
			"--color-blue": "#6ea8fe",
			"--color-red-on": "#ffffff",
			"--color-green-on": "#05050a",
			"--color-blue-on": "#05050a",

			/* ── Lienzo ── */
			"--ui-bg": "#05050a",
			"--ui-surface": "rgba(255, 255, 255, 0.04)",
			"--ui-surface-2": "rgba(255, 255, 255, 0.07)",
			"--ui-surface-border": "rgba(255, 255, 255, 0.10)",
			"--ui-text": "#eef0f6",
			"--ui-text-muted": "#8892a8",
			"--ui-texture": "none",
			"--ui-bg-pattern": "none",

			/* ── Geometría ── */
			"--ui-radius": "24px",
			"--ui-radius-sm": "16px",
			"--ui-radius-pill": "999px",
			"--ui-clip": "none",
			"--ui-border-width": "1px",
			"--ui-border-style": "solid",
			"--ui-border-color": "rgba(255, 255, 255, 0.10)",

			/* ── Topología ── */
			"--ui-shadow": "0 8px 32px rgba(0, 0, 0, 0.35)",
			"--ui-shadow-sm": "0 4px 16px rgba(0, 0, 0, 0.25)",
			"--ui-shadow-pressed": "0 2px 8px rgba(0, 0, 0, 0.30)",
			"--ui-blur": "blur(22px) saturate(160%)",
			"--ui-surface-alpha": "6%",
			"--ui-surface-alpha-strong": "10%",

			/* ── Accent mode ── */
			"--ui-accent-fill": "none",
			"--ui-accent-border": "none",
			"--ui-accent-glow":
				"0 0 60px 20px color-mix(in srgb, var(--color-accent) 18%, transparent)",

			/* ── Tipografía ── */
			"--ui-font-family":
				'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			"--ui-font-display":
				'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			"--ui-letter-spacing": "-0.01em",
			"--ui-text-transform": "none",

			/* ── Cinética ── */
			"--ui-duration": "0.5s",
			"--ui-duration-slow": "1.2s",
			"--ui-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
			"--ui-spring-ease": "cubic-bezier(0.34, 1.56, 0.64, 1)",
			"--ui-spring-duration": "0.45s",
			"--ui-press-transform": "scale(0.96)",

			/* ── Iconos ── */
			"--ui-icon-set": "line",
		},
	},
	minimal: {
		id: "minimal",
		label: "Mínimal",
		description:
			"Wireframe negro. Ghost elements, bordes finos, snappy, quirúrgico.",
		icon: "◯",
		vars: {
			/* ── Semantic colors (pure, maximum contrast against #000) ── */
			"--color-red": "#ff0000",
			"--color-green": "#00ff66",
			"--color-blue": "#4da6ff",
			"--color-red-on": "#000000",
			"--color-green-on": "#000000",
			"--color-blue-on": "#000000",

			/* ── Lienzo ── */
			"--ui-bg": "#000000",
			"--ui-surface": "#000000",
			"--ui-surface-2": "#000000",
			"--ui-surface-border": "rgba(255, 255, 255, 0.08)",
			"--ui-text": "#e8eaed",
			"--ui-text-muted": "#5a5f6b",
			"--ui-texture": "none",
			"--ui-bg-pattern": "none",

			/* ── Geometría ── */
			"--ui-radius": "3px",
			"--ui-radius-sm": "3px",
			"--ui-radius-pill": "999px",
			"--ui-clip": "none",
			"--ui-border-width": "1px",
			"--ui-border-style": "solid",
			"--ui-border-color": "rgba(255, 255, 255, 0.12)",

			/* ── Topología ── */
			"--ui-shadow": "none",
			"--ui-shadow-sm": "none",
			"--ui-shadow-pressed": "none",
			"--ui-blur": "none",
			"--ui-surface-alpha": "0%",
			"--ui-surface-alpha-strong": "0%",

			/* ── Accent mode ── */
			"--ui-accent-fill": "none",
			"--ui-accent-border": "1px solid var(--color-accent)",
			"--ui-accent-glow": "none",

			/* ── Tipografía ── */
			"--ui-font-family":
				'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif',
			"--ui-font-display":
				'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif',
			"--ui-letter-spacing": "-0.02em",
			"--ui-text-transform": "none",

			/* ── Cinética ── */
			"--ui-duration": "0.15s",
			"--ui-duration-slow": "0.25s",
			"--ui-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
			"--ui-spring-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
			"--ui-spring-duration": "0.15s",
			"--ui-press-transform": "scale(0.97)",

			/* ── Iconos ── */
			"--ui-icon-set": "line",
		},
	},
};

export const DEFAULT_UI_STYLE: UIStyleId = "ambient-ai";

export const UI_STYLE_ORDER: UIStyleId[] = [
	"ambient-ai",
	"ciberpunk",
	"minimal",
];
