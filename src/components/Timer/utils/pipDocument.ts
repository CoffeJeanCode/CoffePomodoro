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

export function updatePiPTimeElements(
	doc: Document,
	timerState: Pick<Timer, "remainingTimeText" | "finishTimeText" | "isRunning">,
) {
	const timeEl = doc.getElementById("time-text");
	if (timeEl) timeEl.textContent = timerState.remainingTimeText;

	const finishEl = doc.getElementById("finish-text");
	if (finishEl) {
		finishEl.textContent = timerState.finishTimeText
			? `Finish at ${timerState.finishTimeText}`
			: "";
		finishEl.className = timerState.isRunning
			? "finish-text visible"
			: "finish-text hidden";
	}
}

export function buildPiPControlsHtml(control: {
	isPaused: boolean;
	showSkip: boolean;
	secondaryTitle: string;
}): string {
	const Icons = pipControlIcons;
	const { isPaused, showSkip, secondaryTitle } = control;
	const secondaryTitleAttr = secondaryTitle.replace(/"/g, "&quot;");
	return `
                    <button id="btn-minus" class="btn btn-adjust pip-adj pip-adj--minus" type="button" title="">
                        ${Icons.Minus}
                    </button>
                    <div class="controls-center">
                        <button id="btn-toggle" class="btn btn-main" type="button" title="${isPaused ? "Play <Space>" : "Pause <Space>"}">
                            ${isPaused ? Icons.Play : Icons.Pause}
                        </button>
                        <button id="btn-secondary" class="btn btn-sub" type="button" title="${secondaryTitleAttr}">
                            ${showSkip ? Icons.Skip : Icons.Stop}
                        </button>
                    </div>
                    <button id="btn-plus" class="btn btn-adjust pip-adj pip-adj--plus" type="button" title="">
                        ${Icons.Plus}
                    </button>
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
	const secondaryTitle = secondaryControlTitle(
		mode,
		isRunning,
		skipCountsSessionMinProgressPercent,
	);
	const stateKey = `${getTimerControlsDomStateKey(controlState)}|${secondaryTitle}`;
	const controlsEl = doc.getElementById("controls-area");
	if (!controlsEl) return;

	if (controlsEl.getAttribute("data-state") !== stateKey) {
		controlsEl.setAttribute("data-state", stateKey);
		controlsEl.innerHTML = buildPiPControlsHtml({
			...controlState,
			secondaryTitle,
		});

		doc.getElementById("btn-minus")?.addEventListener("click", () => {
			handlers.onAdjust(-1);
		});
		doc.getElementById("btn-plus")?.addEventListener("click", () => {
			handlers.onAdjust(1);
		});
		doc
			.getElementById("btn-toggle")
			?.addEventListener("click", handlers.onToggle);
		doc.getElementById("btn-secondary")?.addEventListener("click", () => {
			if (controlState.showSkip) handlers.onSkip();
			else handlers.onStop();
		});
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
