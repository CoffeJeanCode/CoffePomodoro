interface PiPColors {
	bgGradient: string;
	btnMain: string;
	btnMainHover: string;
}

/** PiP window — vertical layout, matches app glass + ambient language */
export const getPiPStyles = (colors: PiPColors) => `
    :root {
        --pip-page-bg: #0a0e14;
        --pip-glass-bg: rgba(255, 255, 255, 0.06);
        --pip-glass-border: rgba(255, 255, 255, 0.12);
        --pip-glass-border-top: rgba(255, 255, 255, 0.20);
        --pip-glass-blur: blur(20px) saturate(150%);
        --pip-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
        --pip-radius: 1rem;
        --pip-btn: ${colors.btnMain};
        --pip-btn-hover: ${colors.btnMainHover};
        --pip-accent: ${colors.btnMain};
        --pip-font: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --pip-ease: cubic-bezier(0.4, 0, 0.2, 1);
        --pip-duration: 0.45s;
        --btn-main-size: clamp(36px, 11vmin, 52px);
        --btn-sub-size: clamp(30px, 9vmin, 42px);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }

    body {
        background-color: var(--pip-page-bg);
        background-image:
            radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--pip-accent) 22%, transparent) 0%, transparent 60%),
            linear-gradient(180deg, #0c1018 0%, var(--pip-page-bg) 100%);
        color: #f1f3f5;
        font-family: var(--pip-font);
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
        border-radius: var(--pip-radius);
        background: var(--pip-glass-bg);
        border: 1px solid var(--pip-glass-border);
        border-top-color: var(--pip-glass-border-top);
        box-shadow: var(--pip-shadow);
        backdrop-filter: var(--pip-glass-blur);
        -webkit-backdrop-filter: var(--pip-glass-blur);
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

    /* ── content column (ring + label + intention) ── */
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

    /* ── mode label ── */
    .pip-mode-label {
        font-size: clamp(0.6rem, 3vmin, 0.72rem);
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--pip-accent);
        opacity: 0.85;
        line-height: 1;
    }

    /* ── ring ── */
    .pip-ring-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: min-content;
    }

    .pip-ring-svg {
        transform: rotate(-90deg);
    }

    .pip-ring-track {
        fill: none;
        stroke: rgba(255, 255, 255, 0.08);
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

    #pip-root[data-running="false"] .pip-ring-linear {
        display: none !important;
    }

    /* ── ring center overlay ── */
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

    /* ── paused bars ── */
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
        background: rgba(255, 255, 255, 0.45);
    }

    .pip-paused-mark::before { left: 1px; }
    .pip-paused-mark::after  { right: 1px; }
    .pip-paused-mark.hidden  { display: none; }

    /* ── intention badge ── */
    .intention-text {
        font-size: clamp(0.62rem, 3vmin, 0.78rem);
        font-weight: 400;
        font-style: italic;
        line-height: 1.35;
        text-align: center;
        color: rgba(255, 255, 255, 0.72);
        max-width: 220px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        padding: 4px 10px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.09);
    }

    .intention-text.visible {
        display: block;
    }

    /* ── linear progress fallback (very small windows) ── */
    .pip-ring-linear {
        display: none;
        width: 100%;
        max-width: 200px;
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
    }

    .pip-ring-linear-bar {
        position: relative;
        height: 100%;
        width: 0%;
        background: var(--pip-accent);
        border-radius: 2px;
        transition: width 1s var(--pip-ease);
    }

    /* ── controls row ── */
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
        border: 1px solid var(--pip-glass-border);
        cursor: pointer;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: white;
        transition:
            transform 0.12s var(--pip-ease),
            background var(--pip-duration) var(--pip-ease),
            border-color var(--pip-duration) var(--pip-ease);
        flex-shrink: 0;
    }

    .btn:active { transform: scale(0.90); }

    .btn-main {
        width: var(--btn-main-size);
        height: var(--btn-main-size);
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(8px);
        border-color: var(--pip-glass-border-top);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
    }

    .btn-main:hover { background: rgba(255, 255, 255, 0.24); }

    .btn-sub {
        width: var(--btn-sub-size);
        height: var(--btn-sub-size);
        background: var(--pip-glass-bg);
        backdrop-filter: blur(8px);
    }

    .btn-sub:hover { background: rgba(255, 255, 255, 0.1); }

    .btn svg { width: 44%; height: 44%; fill: currentColor; }

    /* ── compact: short/narrow windows — content left, buttons right ── */
    @media (max-width: 220px), (max-height: 200px) {
        body { padding: 0; }

        #pip-root {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 6px 8px;
            border-radius: 0;
            border: none;
            gap: 8px;
        }

        .pip-content {
            flex: 1;
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            gap: 4px;
            min-width: 0;
        }

        .pip-ring-wrap { display: none; }

        .pip-mode-label { display: none; }

        .intention-text {
            order: 0;
            max-width: 100%;
            text-align: left;
            font-size: 0.6rem;
        }

        .pip-ring-linear {
            display: block;
            order: 1;
            width: 100%;
            max-width: 100%;
            height: 3px;
        }

        .controls {
            flex-shrink: 0;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            width: auto;
        }

        .controls-center { flex-direction: row; gap: 6px; justify-content: flex-end; }

        .btn-main {
            width: clamp(32px, 11vmin, 44px);
            height: clamp(32px, 11vmin, 44px);
        }

        .btn-sub {
            width: clamp(26px, 9vmin, 36px);
            height: clamp(26px, 9vmin, 36px);
        }
    }
`;
