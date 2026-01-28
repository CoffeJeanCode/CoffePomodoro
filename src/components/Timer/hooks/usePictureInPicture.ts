import { Mode } from "@/models/info";
import type { Timer } from "@/models/timer";
import { useInfoState, useTimerState } from "@/stores";
import { useEffect, useRef, useState } from "react";
import { getPiPStyles } from "../utils/pipStyles";

interface UsePictureInPictureProps {
    handleToggleTimer: () => void;
    handleStopTimer: () => void;
    handleNextTimer: ({ isSkip }: { isSkip: boolean }) => void;
}

// Vector Icons
const Icons = {
    Play: `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
    Pause: `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
    Stop: `<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
    Skip: `<svg viewBox="0 0 24 24"><path d="M5 4l10 8-10 8V4zM19 5v14h-2V5h2z"/></svg>`,
};

const usePictureInPicture = ({
    handleToggleTimer,
    handleStopTimer,
    handleNextTimer,
}: UsePictureInPictureProps) => {
    const { mode, sessions } = useInfoState();
    
    // FIXED: Removed 'seconds' and 'initialSeconds' to fix TS error
    const timerState = useTimerState((state: Timer) => ({
        remainingTimeText: state.remainingTimeText,
        finishTimeText: state.finishTimeText,
        isRunning: state.isRunning,
    }));

    const [pipWindow, setPipWindow] = useState<Window | null>(null);
    const pipWindowRef = useRef<Window | null>(null);

    const getThemeColors = () => {
        const isPomodoro = mode === Mode.Pomodoro;
        return {
            bgGradient: isPomodoro 
                ? "linear-gradient(135deg, #e03131 0%, #c92a2a 100%)" 
                : "linear-gradient(135deg, #2f9e44 0%, #2b8a3e 100%)",
            btnMain: isPomodoro ? "#c92a2a" : "#2b8a3e",
            btnMainHover: isPomodoro ? "#b02525" : "#267a37"
        };
    };

    const updatePiPContent = () => {
        const doc = pipWindowRef.current?.document;
        if (!doc) return;

        // 1. Text Content
        const timeEl = doc.getElementById('time-text');
        if (timeEl) timeEl.textContent = timerState.remainingTimeText;

        const finishEl = doc.getElementById('finish-text');
        if (finishEl) {
            finishEl.textContent = timerState.finishTimeText ? `Timer finish at ${timerState.finishTimeText}` : "";
            finishEl.className = timerState.isRunning ? "finish-text visible" : "finish-text hidden";
        }
        const modeEl = doc.getElementById('mode-text');
        if (modeEl) modeEl.textContent = mode;

        // 2. Controls Logic
        const controlsEl = doc.getElementById('controls-area');
        if (controlsEl) {
            const isBreak = mode !== Mode.Pomodoro;
            const showSkip = !timerState.isRunning || isBreak;
            const isPaused = !timerState.isRunning;
            const stateKey = `${isPaused}-${showSkip}`;

            // Only update DOM if logic state changes
            if (controlsEl.getAttribute("data-state") !== stateKey) {
                controlsEl.setAttribute("data-state", stateKey);
                controlsEl.innerHTML = `
                    <button id="btn-toggle" class="btn btn-main" title="${isPaused ? "Play" : "Pause"}">
                        ${isPaused ? Icons.Play : Icons.Pause}
                    </button>
                    <button id="btn-secondary" class="btn btn-sub" title="${showSkip ? "Skip" : "Stop"}">
                        ${showSkip ? Icons.Skip : Icons.Stop}
                    </button>
                `;

                // Re-bind listeners
                doc.getElementById("btn-toggle")?.addEventListener("click", handleToggleTimer);
                doc.getElementById("btn-secondary")?.addEventListener("click", () => {
                    if (showSkip) handleNextTimer({ isSkip: true });
                    else handleStopTimer();
                });
            }
        }
        
        // 3. Update Colors
        const styleEl = doc.getElementById('pip-css');
        if (styleEl && styleEl.getAttribute('data-mode') !== mode) {
            styleEl.textContent = getPiPStyles(getThemeColors());
            styleEl.setAttribute('data-mode', mode);
        }
    };

    const handlePictureInPicture = async () => {
        if (!("documentPictureInPicture" in window)) return;
        if (pipWindowRef.current) { pipWindowRef.current.close(); return; }

        try {
            const pipWin = await (window as any).documentPictureInPicture.requestWindow({
                width: 300, height: 320,
            });

            pipWindowRef.current = pipWin;
            setPipWindow(pipWin);

            // Updated HTML Structure (Progress Removed, Finish Time Enhanced)
            pipWin.document.body.innerHTML = `
                <div id="pip-root">
                    <div class="header">
                        <div id="mode-text" class="badge-mode">${mode}</div>
                    </div>

                    <div class="timer-container">
                        <div id="time-text" class="time-text">${timerState.remainingTimeText}</div>
						<div id="finish-text" class="finish-text ${timerState.isRunning ? "visible" : "hidden"}">${timerState.finishTimeText ? `Timer finish at ${timerState.finishTimeText}` : ""}</div>
                    </div>

                    <div id="controls-area" class="controls">
                        </div>
                </div>
            `;

            const style = pipWin.document.createElement("style");
            style.id = 'pip-css';
            style.setAttribute('data-mode', mode);
            style.textContent = getPiPStyles(getThemeColors());
            pipWin.document.head.append(style);

            pipWin.onpagehide = () => { setPipWindow(null); pipWindowRef.current = null; };
            updatePiPContent();

        } catch (err) {
            console.error("PiP Error:", err);
        }
    };

    useEffect(() => {
        if (pipWindowRef.current) updatePiPContent();
    }, [timerState.remainingTimeText, timerState.finishTimeText, timerState.isRunning, mode, sessions]);

    return { pipWindow, handlePictureInPicture, isPiPOpen: !!pipWindow };
};

export default usePictureInPicture;