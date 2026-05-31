import { Mode } from "@/models/info";
import type { Timer } from "@/models/timer";
import {
	getSkipButtonTitle,
	getTimerControlState,
	getTimerControlsDomStateKey,
} from "./timerControls";

const MODE_LABEL: Record<Mode, string> = {
	[Mode.Pomodoro]: "Focus",
	[Mode.ShortBreak]: "Short break",
	[Mode.LongBreak]: "Long break",
};

export const pipControlIcons = {
	Play: `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
	Pause: `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
	Stop: `<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
	Skip: `<svg viewBox="0 0 24 24"><path d="M5 4l10 8-10 8V4zM19 5v14h-2V5h2z"/></svg>`,
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
	const circle = doc.getElementById(
		"pip-ring-progress",
	) as SVGCircleElement | null;
	if (!circle) return;

	const radius = Number(circle.getAttribute("r") ?? 0);
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (sessionProgressPercent / 100) * circumference;
	circle.setAttribute("stroke-dasharray", String(circumference));
	circle.setAttribute("stroke-dashoffset", String(offset));
	circle.setAttribute("stroke", accentColor);

	const bar = doc.getElementById("pip-ring-linear-bar") as HTMLElement | null;
	if (bar) {
		bar.style.width = `${sessionProgressPercent}%`;
		bar.style.background = accentColor;
	}
}

export function updatePiPTimeElements(
	doc: Document,
	timerState: Pick<Timer, "isRunning">,
	mode: Mode,
	sessionIntention?: string,
) {
	const root = doc.getElementById("pip-root");
	if (root)
		root.setAttribute("data-running", timerState.isRunning ? "true" : "false");

	const modeLabelEl = doc.getElementById("pip-mode-label");
	if (modeLabelEl) modeLabelEl.textContent = MODE_LABEL[mode] ?? "Focus";

	const pausedEl = doc.getElementById("pip-paused-mark");
	if (pausedEl) {
		pausedEl.className = timerState.isRunning
			? "pip-paused-mark hidden"
			: "pip-paused-mark";
	}

	const showIntention =
		mode === Mode.Pomodoro ? Boolean(sessionIntention?.trim().length) : true;
	const intentionText =
		mode === Mode.Pomodoro ? (sessionIntention?.trim() ?? "") : "Take a break";
	const intentionEl = doc.getElementById("intention-text");
	if (intentionEl) {
		intentionEl.textContent = showIntention ? intentionText : "";
		intentionEl.className = showIntention
			? "intention-text visible"
			: "intention-text";
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
	onToggle: () => void;
	onSkip: () => void;
	onStop: () => void;
}

function secondaryControlTitle(mode: Mode, isRunning: boolean): string {
	const { showSkip } = getTimerControlState(mode, isRunning);
	return showSkip ? getSkipButtonTitle(mode) : "Stop <S>";
}

export function mountOrUpdatePiPControls(
	doc: Document,
	mode: Mode,
	isRunning: boolean,
	handlers: PiPControlHandlers,
) {
	const controlState = getTimerControlState(mode, isRunning);
	const stateKey = `${isRunning ? "running" : "paused"}`;
	const controlsEl = doc.getElementById("controls-area");
	if (!controlsEl) return;

	if (controlsEl.getAttribute("data-state") !== stateKey) {
		controlsEl.setAttribute("data-state", stateKey);
		controlsEl.innerHTML = buildPiPControlsHtml({
			isPaused: controlState.isPaused,
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
