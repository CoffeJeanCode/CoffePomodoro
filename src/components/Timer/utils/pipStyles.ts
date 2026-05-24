export interface PiPThemeTokens {
	/** --color-* map of the active color scheme. */
	colorVars: Record<string, string>;
	/** --ui-* structural map of the active style profile. */
	styleVars: Record<string, string>;
	/** Mode accent (focus / short break / long break) for the active scheme. */
	accent: string;
}

const serializeVars = (vars: Record<string, string>): string =>
	Object.entries(vars)
		.map(([k, v]) => `        ${k}: ${v};`)
		.join("\n");

/**
 * PiP window styles. Injects BOTH axes (color + structure) into the PiP :root and
 * recomposes the same aliases the app uses, so the floating window mirrors the
 * active color scheme AND the active structural style.
 */
export const getPiPStyles = (t: PiPThemeTokens) => `
    :root {
${serializeVars(t.colorVars)}
${serializeVars(t.styleVars)}
        /* composed aliases (color ⊗ structure) */
        --ui-glass-bg: color-mix(in srgb, var(--ui-surface) var(--ui-surface-alpha), transparent);
        --ui-glass-bg-strong: color-mix(in srgb, var(--ui-surface) var(--ui-surface-alpha-strong), transparent);
        --ui-glass-border: var(--ui-border-color);
        --ui-glass-border-top: var(--ui-border-color);
        --ui-glass-blur: var(--ui-blur);
        --ui-page-bg: var(--ui-bg);
        --ui-page-glow: color-mix(in srgb, var(--color-accent) 7%, transparent);
        --ui-ring-accent: var(--color-accent);
        --ui-ring-accent-soft: color-mix(in srgb, var(--color-accent) 15%, transparent);
        --ui-ring-accent-glow: color-mix(in srgb, var(--color-accent) 28%, transparent);
        --ui-ring-track: var(--color-ring-track);
        --pip-accent: ${t.accent};
        --pip-ease: var(--ui-ease);
        --pip-duration: var(--ui-duration);
        --btn-main-size: clamp(36px, 11vmin, 52px);
        --btn-sub-size: clamp(30px, 9vmin, 42px);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }

    body {
        background-color: var(--ui-bg);
        background-image: radial-gradient(ellipse 80% 60% at 50% 0%, var(--ui-page-glow) 0%, transparent 55%);
        color: var(--ui-text);
        font-family: var(--ui-font-family);
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
    }

    #pip-root {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        gap: 6px;
        padding: 12px 14px;
        border-radius: var(--ui-radius);
        background: var(--ui-glass-bg);
        border: var(--ui-border-width) var(--ui-border-style) var(--ui-glass-border);
        box-shadow: var(--ui-shadow);
        backdrop-filter: var(--ui-glass-blur);
        -webkit-backdrop-filter: var(--ui-glass-blur);
        overflow: hidden;
        transition:
            border-color var(--pip-duration) var(--pip-ease),
            box-shadow var(--pip-duration) var(--pip-ease);
    }

    #pip-ambient {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        opacity: 0.85;
        pointer-events: none;
        z-index: 0;
        transition: background 1.2s var(--pip-ease);
    }

    .pip-content {
        position: relative;
        z-index: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        min-height: 0;
    }

    .pip-mode-label {
        font-size: clamp(0.6rem, 3vmin, 0.72rem);
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--pip-accent);
        opacity: 0.9;
        line-height: 1;
    }

    .pip-ring-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: min-content;
    }

    .pip-ring-svg { transform: rotate(-90deg); }

    .pip-ring-track {
        fill: none;
        stroke: var(--color-ring-track);
    }

    .pip-ring-progress {
        fill: none;
        stroke: var(--pip-accent);
        stroke-linecap: round;
        transition: stroke-dashoffset 1.2s var(--pip-ease);
    }

    #pip-root[data-running="false"] .pip-ring-progress {
        opacity: 0.4;
        transition: stroke-dashoffset 0.6s var(--pip-ease);
    }

    #pip-root[data-running="false"] .pip-ring-linear { display: none !important; }

    .pip-time-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        pointer-events: none;
    }

    .time-text {
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        text-align: center;
        font-size: clamp(1.05rem, 6.5vmin, 1.4rem);
color: var(--ui-text);
	}

	#pip-root[data-running="false"] .time-text { opacity: 0.7; }

    .pip-paused-mark {
        position: relative;
        width: 12px;
        height: 12px;
        flex-shrink: 0;
    }

    .pip-paused-mark::before,
    .pip-paused-mark::after {
        content: "";
        position: absolute;
        top: 1px;
        width: 3px;
        height: 10px;
        border-radius: 1.5px;
        background: var(--ui-text-muted);
    }

    .pip-paused-mark::before { left: 1px; }
    .pip-paused-mark::after  { right: 1px; }
    .pip-paused-mark.hidden  { display: none; }

    .intention-text {
        display: none;
        font-size: clamp(0.62rem, 3vmin, 0.78rem);
        font-weight: 400;
        font-style: italic;
        line-height: 1.35;
        text-align: center;
        color: var(--ui-text-muted);
        max-width: 220px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding: 4px 10px;
        border-radius: var(--ui-radius-sm);
        background: var(--ui-glass-bg);
        border: var(--ui-border-width) var(--ui-border-style) var(--ui-glass-border);
        border-left: 2px solid var(--pip-accent);
        margin: 0 auto;
    }

    .intention-text.visible { display: -webkit-box; }

    .pip-ring-linear {
        display: none;
        width: 100%;
        max-width: 200px;
        height: 3px;
        background: var(--color-ring-track);
        border-radius: var(--ui-radius-pill);
        overflow: hidden;
    }

    .pip-ring-linear-bar {
        position: relative;
        height: 100%;
        width: 0%;
        background: var(--pip-accent);
        border-radius: var(--ui-radius-pill);
        transition: width 1s var(--pip-ease);
    }

    .controls {
        position: relative;
        z-index: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
    }

    .controls-center {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: clamp(10px, 3vmin, 18px);
    }

    .btn {
        border: var(--ui-border-width) var(--ui-border-style) var(--ui-glass-border);
        cursor: pointer;
        display: grid;
        place-items: center;
        border-radius: var(--ui-radius-pill);
        color: var(--ui-text);
        transition:
            transform var(--ui-spring-duration) var(--ui-spring-ease),
            background var(--pip-duration) var(--pip-ease),
            box-shadow var(--pip-duration) var(--pip-ease);
        flex-shrink: 0;
    }

    .btn:active {
        transform: var(--ui-press-transform);
        box-shadow: var(--ui-shadow-pressed);
    }

    .btn-main {
        width: var(--btn-main-size);
        height: var(--btn-main-size);
        background: var(--pip-accent);
        color: var(--color-accent-contrast);
        border-color: var(--pip-accent);
        box-shadow: var(--ui-shadow-sm);
    }

    .btn-main:hover { filter: brightness(1.1); }

    .btn-sub {
        width: var(--btn-sub-size);
        height: var(--btn-sub-size);
        background: var(--ui-glass-bg);
        box-shadow: var(--ui-shadow-sm);
    }

    .btn-sub:hover { border-color: var(--pip-accent); }

    .btn svg { width: 44%; height: 44%; fill: currentColor; }

    @media (max-width: 220px), (max-height: 200px) {
        body { padding: 0; }

        #pip-root {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8px 10px;
            border-radius: 0;
            border: none;
            gap: 10px;
        }

        .pip-content {
            flex: 1;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 5px;
            min-width: 0;
        }

        .pip-ring-wrap { display: none; }

        .pip-ring-linear {
            display: block;
            width: 100%;
            max-width: 100%;
            height: 4px;
        }

        .pip-mode-label { display: none; }

        .pip-ring-linear { order: 1; }

        .intention-text {
            order: 0;
            max-width: 100%;
            text-align: center;
            padding: 2px 6px;
            font-size: 0.6rem;
        }

        .controls {
            flex-shrink: 0;
            flex-direction: row;
            align-items: center;
            gap: 6px;
        }

        .controls-center { flex-direction: row; gap: 6px; }

        .btn-main {
            width: clamp(28px, 9vmin, 38px);
            height: clamp(28px, 9vmin, 38px);
        }

        .btn-sub {
            width: clamp(24px, 7.5vmin, 32px);
            height: clamp(24px, 7.5vmin, 32px);
        }
    }
`;
