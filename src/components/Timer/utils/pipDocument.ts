import type { Mode } from "@/models/info";
import type { Timer } from "@/models/timer";
import {
	getSkipButtonTitle,
	getTimerControlState,
	getTimerControlsDomStateKey,
} from "./timerControls";

export const pipControlIcons = {
	Play: `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
	Pause: `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
	Stop: `<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
	Skip: `<svg viewBox="0 0 24 24"><path d="M5 4l10 8-10 8V4zM19 5v14h-2V5h2z"/></svg>`,
	Minus: `<svg viewBox="0 0 24 24"><path d="M5 11h14v2H5z"/></svg>`,
	Plus: `<svg viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z"/></svg>`,
} as const;

export function updatePiPAmbient(doc: Document, ambientBackground: string) {
	const el = doc.getElementById("pip-ambient");
	if (el) el.style.background = ambientBackground;
}

export function updatePiPProgressRing(
	doc: Document,
	sessionProgressPercent: number,
	accentColor: string,
) {
	const circle = doc.getElementById("pip-ring-progress") as SVGCircleElement | null;
	if (!circle) return;

	const radius = Number(circle.getAttribute("r") ?? 0);
	const circumference = 2 * Math.PI * radius;
	const offset =
		circumference - (sessionProgressPercent / 100) * circumference;
	circle.setAttribute("stroke-dasharray", String(circumference));
	circle.setAttribute("stroke-dashoffset", String(offset));
	circle.setAttribute("stroke", accentColor);
}

const getProgressLabel = (percent: number): string => {
	if (percent < 20) return "Beginning";
	if (percent < 40) return "Focusing";
	if (percent < 60) return "Flowing";
	if (percent < 80) return "Deep";
	if (percent < 95) return "Winding down";
	return "Finishing";
};

export function updatePiPTimeElements(
	doc: Document,
	timerState: Pick<Timer, "remainingTimeText" | "finishTimeText" | "isRunning">,
	sessionProgressPercent: number,
) {
	const timeEl = doc.getElementById("time-text");
	if (timeEl) {
		const label = timerState.isRunning
			? getProgressLabel(sessionProgressPercent)
			: timerState.remainingTimeText;
		timeEl.textContent = label;
		timeEl.className = timerState.isRunning ? "time-text abstract" : "time-text";
	}

	const finishEl = doc.getElementById("finish-text");
	if (finishEl) {
		finishEl.textContent = timerState.isRunning ? "Session in progress" : "";
		finishEl.className = timerState.isRunning
			? "finish-text visible"
			: "finish-text hidden";
}
}

export function buildPiPControlsHtml(control: {
	isPaused: boolean;
}): string {
	const Icons = pipControlIcons;
	const { isPaused } = control;
	return `
                    <div class="controls-center">
                        <button id="btn-toggle" class="btn btn-main" type="button" title="${isPaused ? "Start" : "Pause"}">
                            ${isPaused ? Icons.Play : Icons.Pause}
                        </button>
                        <button id="btn-stop" class="btn btn-sub" type="button" title="End session">
                            ${Icons.Stop}
                        </button>
                    </div>
                `;
}

export interface PiPControlHandlers {
	onAdjust: (delta: 1 | -1) => void;
	onToggle: () => void;
	onSkip: () => void;
	onStop: () => void;
}

function secondaryControlTitle(
	mode: Mode,
	isRunning: boolean,
	skipCountsSessionMinProgressPercent: number,
): string {
	const { showSkip } = getTimerControlState(mode, isRunning);
	return showSkip
		? getSkipButtonTitle(mode, skipCountsSessionMinProgressPercent)
		: "Stop <S>";
}

export function mountOrUpdatePiPControls(
	doc: Document,
	mode: Mode,
	isRunning: boolean,
	skipCountsSessionMinProgressPercent: number,
	handlers: PiPControlHandlers,
) {
	const controlState = getTimerControlState(mode, isRunning);
	const stateKey = `${isRunning ? "running" : "paused"}`;
	const controlsEl = doc.getElementById("controls-area");
	if (!controlsEl) return;

	if (controlsEl.getAttribute("data-state") !== stateKey) {
		controlsEl.setAttribute("data-state", stateKey);
		controlsEl.innerHTML = buildPiPControlsHtml({
			isPaused: !controlState.isPaused,
		});

		doc
			.getElementById("btn-toggle")
			?.addEventListener("click", handlers.onToggle);
		doc.getElementById("btn-stop")?.addEventListener("click", handlers.onStop);
	}
}

export function syncPiPTheme(doc: Document, mode: Mode, cssText: string) {
	const styleEl = doc.getElementById("pip-css");
	if (styleEl && styleEl.getAttribute("data-mode") !== String(mode)) {
		styleEl.textContent = cssText;
		styleEl.setAttribute("data-mode", String(mode));
	}
}

export function updatePiPAdjustButtonTitles(
	doc: Document,
	sessionAdjustStepMinutes: number,
) {
	const stepLabel =
		sessionAdjustStepMinutes === 1
			? "1 minute"
			: `${sessionAdjustStepMinutes} minutes`;
	doc
		.getElementById("btn-minus")
		?.setAttribute("title", `Subtract ${stepLabel} (−)`);
	doc.getElementById("btn-plus")?.setAttribute("title", `Add ${stepLabel} (+)`);
}
