// src/components/Timer/hooks/pipStyles.ts
// Default layout: horizontal — time (+ finish) | − play/skip + (mode = background color only)

interface PiPColors {
	bgGradient: string;
	btnMain: string;
	btnMainHover: string;
}

export const getPiPStyles = (colors: PiPColors) => `
    :root {
        --bg: ${colors.bgGradient};
        --btn-color: ${colors.btnMain};
        --btn-hover: ${colors.btnMainHover};
        --font-sys: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --pip-pad: clamp(6px, 1.8vmin, 12px);
        --btn-main-size: clamp(30px, 10vmin, 56px);
        --btn-sub-size: clamp(26px, 8.5vmin, 44px);
        --btn-adj-size: clamp(24px, 8vmin, 36px);
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        user-select: none;
    }

    body {
        background: var(--bg);
        color: white;
        font-family: var(--font-sys);
        height: 100vh;
        width: 100vw;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Horizontal strip: [ time (+ finish) ] [ − play/skip + ] */
    #pip-root {
        display: grid;
        width: 100%;
        height: 100%;
        min-height: 0;
        min-width: 0;
        grid-template-columns: minmax(0, 1fr) max-content;
        grid-template-rows: 1fr;
        align-items: center;
        column-gap: clamp(8px, 2.5vmin, 16px);
        padding: var(--pip-pad);
    }

    .timer-container {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: 0;
        gap: clamp(2px, 0.8vmin, 6px);
        overflow: hidden;
    }

    .time-text {
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        line-height: 1;
        text-shadow: 0 4px 14px rgba(0,0,0,0.3);
        letter-spacing: -0.02em;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: clamp(22px, 12vmin, 5rem);
    }

    .finish-text {
        font-size: clamp(10px, 2.2vmin, 11px);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        max-width: 100%;
        min-width: 0;
        text-align: center;
        line-height: 1.2;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-word;
    }
    .finish-text.visible {
        opacity: 0.88;
    }
    .finish-text.hidden {
        display: none;
    }

    .controls {
        grid-column: 2;
        grid-row: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-end;
        gap: clamp(3px, 1.2vmin, 8px);
        width: max-content;
        min-width: min-content;
        padding: 0;
    }

    .controls-center {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: clamp(3px, 1.2vmin, 8px);
        flex-shrink: 0;
    }

    .btn {
        border: none;
        cursor: pointer;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: white;
        transition: transform 0.12s, background-color 0.18s;
        flex-shrink: 0;
    }

    .btn:active {
        transform: scale(0.92);
    }

    .btn-main {
        width: var(--btn-main-size);
        height: var(--btn-main-size);
        min-width: 26px;
        min-height: 26px;
        background: white;
        color: var(--btn-color);
        box-shadow: 0 4px 12px rgba(0,0,0,0.22);
    }

    .btn-sub {
        width: var(--btn-sub-size);
        height: var(--btn-sub-size);
        min-width: 24px;
        min-height: 24px;
        background: rgba(255,255,255,0.2);
        backdrop-filter: blur(6px);
    }

    .btn-adjust {
        width: var(--btn-adj-size);
        height: var(--btn-adj-size);
        min-width: 22px;
        min-height: 22px;
        background: rgba(255,255,255,0.14);
        backdrop-filter: blur(4px);
        color: rgba(255,255,255,0.78);
    }

    .btn-adjust:hover {
        background: rgba(255,255,255,0.24);
        color: white;
    }

    .btn svg {
        width: 52%;
        height: 52%;
        fill: currentColor;
    }

    /* Very narrow: stack time / controls; ± top row, play+skip centered below */
    @media (max-width: 220px) {
        #pip-root {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            row-gap: clamp(4px, 1.5vmin, 8px);
            column-gap: 0;
            align-items: stretch;
        }

        .timer-container {
            grid-column: 1;
            grid-row: 1;
        }

        .controls {
            grid-column: 1;
            grid-row: 2;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            width: 100%;
            max-width: none;
            column-gap: 8px;
            row-gap: 6px;
            justify-items: stretch;
            align-items: center;
        }

        .pip-adj--minus {
            grid-column: 1;
            grid-row: 1;
            justify-self: start;
        }

        .pip-adj--plus {
            grid-column: 2;
            grid-row: 1;
            justify-self: end;
        }

        .controls-center {
            grid-column: 1 / -1;
            grid-row: 2;
            justify-content: center;
            width: 100%;
        }
    }

    /* Taller windows — scale time up */
    @media (min-width: 280px) and (min-height: 160px) {
        .time-text {
            font-size: clamp(28px, 14vmin, 7rem) !important;
        }

        .finish-text {
            font-size: clamp(9px, 2.5vmin, 12px);
        }
    }

    @media (min-width: 400px) and (min-height: 220px) {
        .time-text {
            font-size: clamp(40px, 16vmin, 9rem) !important;
        }

        .finish-text {
            font-size: clamp(10px, 2.4vmin, 14px);
        }

        .btn-main {
            width: clamp(40px, 11vmin, 60px);
            height: clamp(40px, 11vmin, 60px);
        }

        .btn-sub {
            width: clamp(34px, 9vmin, 48px);
            height: clamp(34px, 9vmin, 48px);
        }

        .btn-adjust {
            width: clamp(30px, 8vmin, 40px);
            height: clamp(30px, 8vmin, 40px);
        }
    }

    @media (min-width: 560px) and (min-height: 320px) {
        .time-text {
            font-size: clamp(56px, 18vmin, 12rem) !important;
        }
    }
`;
