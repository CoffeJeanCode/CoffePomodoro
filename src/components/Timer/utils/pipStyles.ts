interface PiPColors {
	bgGradient: string;
	btnMain: string;
	btnMainHover: string;
}

/** PiP window — matches app glass + ambient language */
export const getPiPStyles = (colors: PiPColors) => `
    :root {
        --pip-page-bg: #0a0e14;
        --pip-glass-bg: rgba(255, 255, 255, 0.06);
        --pip-glass-border: rgba(255, 255, 255, 0.14);
        --pip-glass-border-top: rgba(255, 255, 255, 0.22);
        --pip-glass-blur: blur(20px) saturate(150%);
        --pip-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
        --pip-radius: 1rem;
        --pip-btn: ${colors.btnMain};
        --pip-btn-hover: ${colors.btnMainHover};
        --pip-accent: ${colors.btnMain};
        --pip-font: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --pip-pad: clamp(8px, 2vmin, 14px);
        --pip-ease: cubic-bezier(0.4, 0, 0.2, 1);
        --pip-duration: 0.45s;
        --btn-main-size: clamp(32px, 9vmin, 48px);
        --btn-sub-size: clamp(28px, 7.5vmin, 40px);
        --btn-adj-size: clamp(26px, 7vmin, 36px);
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        user-select: none;
    }

    body {
        background-color: var(--pip-page-bg);
        background-image:
            radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--pip-accent) 18%, transparent) 0%, transparent 55%),
            linear-gradient(180deg, #0c1018 0%, var(--pip-page-bg) 100%);
        color: #f1f3f5;
        font-family: var(--pip-font);
        height: 100vh;
        width: 100vw;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--pip-pad);
    }

    #pip-root {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        gap: clamp(6px, 1.5vmin, 10px);
        padding: var(--pip-pad);
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
        opacity: 0.88;
        pointer-events: none;
        z-index: 0;
        transition: background 1.2s var(--pip-ease);
    }

    .pip-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: clamp(4px, 1.2vmin, 8px);
    }

    .pip-ring-wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: min-content;
        margin-inline: auto;
    }

    .pip-time-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .pip-ring-svg {
        transform: rotate(-90deg);
    }

    .pip-ring-track {
        fill: none;
        stroke: rgba(255, 255, 255, 0.1);
    }

    .pip-ring-progress {
        fill: none;
        stroke: var(--pip-accent);
        stroke-linecap: round;
        transition: stroke-dashoffset 1s var(--pip-ease);
    }

    #pip-root[data-running="false"] .pip-ring-progress {
        opacity: 0.45;
    }

    .pip-paused-mark {
        position: relative;
        width: 14px;
        height: 14px;
        flex-shrink: 0;
    }

    .pip-paused-mark::before,
    .pip-paused-mark::after {
        content: "";
        position: absolute;
        top: 1px;
        width: 3px;
        height: 12px;
        border-radius: 1px;
        background: rgba(255, 255, 255, 0.55);
    }

    .pip-paused-mark::before {
        left: 2px;
    }

    .pip-paused-mark::after {
        right: 2px;
    }

    .pip-paused-mark.hidden {
        display: none;
    }

    .timer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 0;
        gap: clamp(2px, 0.6vmin, 4px);
    }

    .time-text {
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        text-align: center;
        font-size: clamp(1.35rem, 8vmin, 2.75rem);
        text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
    }

    .time-text.abstract {
        font-size: clamp(0.8rem, 3.5vmin, 1rem);
        font-weight: 400;
        letter-spacing: 0.1em;
        text-transform: lowercase;
        opacity: 0.75;
    }

    .time-text.hidden {
        display: none;
    }

    .intention-text {
        display: none;
        font-size: clamp(0.65rem, 2.8vmin, 0.85rem);
        font-weight: 500;
        line-height: 1.3;
        text-align: center;
        padding: 0 4px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-width: 200px;
        opacity: 0.8;
    }

    .intention-text.visible {
        display: -webkit-box;
    }

    .finish-text {
        font-size: clamp(0.6rem, 2vmin, 0.7rem);
        font-weight: 500;
        opacity: 0.75;
        text-align: center;
        line-height: 1.2;
    }

    .finish-text.hidden {
        display: none;
    }

    .controls {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        gap: clamp(4px, 1.2vmin, 8px);
        flex-shrink: 0;
    }

    .controls-center {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: clamp(6px, 1.5vmin, 12px);
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

    .btn:active {
        transform: scale(0.92);
    }

    .btn-main {
        width: var(--btn-main-size);
        height: var(--btn-main-size);
        background: rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(8px);
        color: white;
        border-color: var(--pip-glass-border-top);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }

    .btn-main:hover {
        background: rgba(255, 255, 255, 0.22);
    }

    .btn-sub {
        width: var(--btn-sub-size);
        height: var(--btn-sub-size);
        background: var(--pip-glass-bg);
        backdrop-filter: blur(8px);
    }

    .btn-sub:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .btn-adjust {
        width: var(--btn-adj-size);
        height: var(--btn-adj-size);
        background: transparent;
        color: rgba(255, 255, 255, 0.72);
    }

    .btn-adjust:hover {
        background: rgba(255, 255, 255, 0.08);
        color: white;
    }

    .btn svg {
        width: 50%;
        height: 50%;
        fill: currentColor;
    }

    .pip-ring-linear {
        display: none;
        position: relative;
        width: 100%;
        max-width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
    }

    .pip-ring-linear-bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0%;
        background: var(--pip-accent);
        border-radius: 2px;
        transition: width 1s var(--pip-ease);
    }

    @media (max-width: 320px), (max-height: 260px) {
        body {
            padding: 0;
        }

        #pip-root {
            padding: 0;
            border-radius: 0;
            border: none;
            gap: 0;
        }

        .pip-ring-wrap {
            display: none;
        }

        .pip-ring-linear {
            display: block;
            max-width: 100%;
            height: 3px;
            border-radius: 0;
        }

        .pip-content {
            gap: 0;
        }

        .controls {
            gap: 0;
        }

        .controls-center {
            gap: 4px;
        }

        .intention-text {
            max-width: 100%;
            padding: 0 6px;
        }

        .btn-main {
            width: clamp(28px, 8vmin, 40px);
            height: clamp(28px, 8vmin, 40px);
        }

        .btn-sub {
            width: clamp(24px, 7vmin, 34px);
            height: clamp(24px, 7vmin, 34px);
        }
    }

`;
