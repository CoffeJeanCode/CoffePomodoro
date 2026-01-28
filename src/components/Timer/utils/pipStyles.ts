// src/components/Timer/hooks/pipStyles.ts

interface PiPColors {
    bgGradient: string;
    btnMain: string;
    btnMainHover: string;
}

export const getPiPStyles = (colors: PiPColors) => `
    /* ────────────────────────────────────────────────────────────────
       1. ROOT & RESET
    ──────────────────────────────────────────────────────────────── */
    :root {
        --bg: ${colors.bgGradient};
        --btn-color: ${colors.btnMain};
        --btn-hover: ${colors.btnMainHover};
        --font-sys: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* ────────────────────────────────────────────────────────────────
       2. MAIN STRUCTURE
    ──────────────────────────────────────────────────────────────── */
    #pip-root {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-rows: auto 1fr auto;
        padding: 10px;
        gap: 6px;
        align-items: center;
        justify-items: center;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        text-align: center;
        z-index: 10;
    }

    .badge-mode {
        font-size: clamp(9px, 2.8vw, 12px);
        font-weight: 800;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        background: rgba(0,0,0,0.25);
        padding: 4px 12px;
        border-radius: 14px;
        white-space: nowrap;
        backdrop-filter: blur(5px);
    }

    .timer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        gap: 6px;
    }

    .time-text {
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        line-height: 0.9;
        text-shadow: 0 6px 16px rgba(0,0,0,0.28);
        letter-spacing: -0.02em;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;

        font-size: clamp(
            24px,
            calc(5.8vw + 3.2vh + 1.4vmax),
            9.8rem
        );
    }

    .finish-text {
        font-size: clamp(10px, 2.9vw, 13px);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        letter-spacing: 0.4px;
        transition: opacity 0.2s ease-in;
    }
    .finish-text.visible {
        opacity: 0.88;
    }
    .finish-text.hidden {
        opacity: 0;
    }

    .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        width: 100%;
        padding-top: 6px;
    }

    .btn {
        border: none;
        cursor: pointer;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: white;
        transition: transform 0.12s, background-color 0.18s;
    }

    .btn:active {
        transform: scale(0.91);
    }

    .btn-main {
        width: clamp(44px, 13.5vw, 60px);
        height: clamp(44px, 13.5vw, 60px);
        background: white;
        color: var(--btn-color);
        box-shadow: 0 5px 14px rgba(0,0,0,0.22);
    }

    .btn-sub {
        width: clamp(34px, 10vw, 46px);
        height: clamp(34px, 10vw, 46px);
        background: rgba(255,255,255,0.18);
        backdrop-filter: blur(6px);
    }

    .btn svg {
        width: 52%;
        height: 52%;
        fill: currentColor;
    }

    /* ────────────────────────────────────────────────────────────────
       3. MEDIA QUERIES — smallest → largest (mobile-first)
    ──────────────────────────────────────────────────────────────── */

    /* Very narrow sidebar / nano mode */
    @media (max-width: 110px) {
        #pip-root {
            padding: 8px 5px;
            gap: 10px;
            grid-template-rows: 0fr 1fr auto;
        }

        .header,
        .badge-mode {
            display: none !important;
        }

        .finish-text {
            font-size: clamp(9px, 3.1vh, 11px);
        }

        .time-text {
            font-size: clamp(22px, 7.2vh, 38px) !important;
        }

        .controls {
            flex-direction: column;
            gap: 10px;
        }

        .btn-sub {
            display: none;
        }

        .btn-main {
            width: 42px;
            height: 42px;
        }
    }

    /* Very flat (horizontal ticker) */
    @media (max-height: 110px) {
        #pip-root {
            grid-template-rows: 1fr;
            grid-template-columns: min-content 1fr min-content;
            padding: 0 16px;
            gap: 16px;
            align-items: center;
        }

        .header,
        .badge-mode {
            display: none !important;
        }


        .time-text {
            font-size: clamp(32px, calc(6.5vh + 24px), 68px) !important;
        }

        .finish-text {
            font-size: clamp(11px, 3.6vh, 15px);
            opacity: 0.82;
        }

        .controls {
            width: auto;
            padding: 0;
            gap: 12px;
        }

        .btn-main {
            width: 40px;
            height: 40px;
        }

        .btn-sub {
            width: 32px;
            height: 32px;
        }
    }

    /* Medium-small windows – give timer a bit more room */
    @media (min-width: 320px) and (min-height: 240px) {
        .time-text {
            font-size: clamp(
                32px,
                calc(7.2vw + 4.1vh + 1.8vmax),
                11rem
            ) !important;
        }

        .finish-text {
            font-size: clamp(12px, 3.2vw, 15px);
        }
    }

    /* Larger / more comfortable PiP windows */
    @media (min-width: 480px) and (min-height: 360px) {
        #pip-root {
            padding: 14px;
            gap: 10px;
        }

        .time-text {
            font-size: clamp(
                48px,
                calc(9.5vw + 5.8vh + 2.4vmax),
                13.5rem
            ) !important;
        }

        .finish-text {
            font-size: clamp(13px, 3.4vw, 17px);
        }

        .btn-main {
            width: clamp(56px, 14vw, 72px);
            height: clamp(56px, 14vw, 72px);
        }

        .btn-sub {
            width: clamp(42px, 11vw, 54px);
            height: clamp(42px, 11vw, 54px);
        }
    }

    /* Very large windows – maximum prominence */
    @media (min-width: 700px) and (min-height: 500px) {
        .time-text {
            font-size: clamp(
                80px,
                calc(11vw + 7vh + 3vmax),
                16rem
            ) !important;
        }

        .finish-text {
            font-size: clamp(16px, 2.8vw, 20px);
        }

        .badge-mode {
            font-size: clamp(13px, 2.4vw, 17px);
            padding: 6px 14px;
        }
    }
`;