import { type UIStyleId, getActiveUIStyleId } from "@/theme/activeStyle";

type UIEvent = "click" | "toggle" | "fulfill" | "transition";

interface SoundProfile {
	oscType: OscillatorType;
	frequency: number;
	duration: number;
	attack: number;
	decay: number;
	volume: number;
}

const PROFILES: Record<string, Record<UIEvent, SoundProfile>> = {
	ciberpunk: {
		click: {
			oscType: "square",
			frequency: 880,
			duration: 0.04,
			attack: 0.002,
			decay: 0.038,
			volume: 0.08,
		},
		toggle: {
			oscType: "square",
			frequency: 660,
			duration: 0.06,
			attack: 0.002,
			decay: 0.058,
			volume: 0.06,
		},
		fulfill: {
			oscType: "square",
			frequency: 440,
			duration: 0.12,
			attack: 0.005,
			decay: 0.115,
			volume: 0.1,
		},
		transition: {
			oscType: "square",
			frequency: 220,
			duration: 0.08,
			attack: 0.002,
			decay: 0.078,
			volume: 0.05,
		},
	},
	"ambient-ai": {
		click: {
			oscType: "sine",
			frequency: 660,
			duration: 0.18,
			attack: 0.01,
			decay: 0.17,
			volume: 0.06,
		},
		toggle: {
			oscType: "sine",
			frequency: 880,
			duration: 0.22,
			attack: 0.008,
			decay: 0.212,
			volume: 0.05,
		},
		fulfill: {
			oscType: "triangle",
			frequency: 523.25,
			duration: 0.35,
			attack: 0.015,
			decay: 0.335,
			volume: 0.08,
		},
		transition: {
			oscType: "sine",
			frequency: 392,
			duration: 0.2,
			attack: 0.012,
			decay: 0.188,
			volume: 0.04,
		},
	},
	minimal: {
		click: {
			oscType: "triangle",
			frequency: 1200,
			duration: 0.02,
			attack: 0.001,
			decay: 0.019,
			volume: 0.03,
		},
		toggle: {
			oscType: "triangle",
			frequency: 900,
			duration: 0.025,
			attack: 0.001,
			decay: 0.024,
			volume: 0.025,
		},
		fulfill: {
			oscType: "sine",
			frequency: 660,
			duration: 0.06,
			attack: 0.002,
			decay: 0.058,
			volume: 0.04,
		},
		transition: {
			oscType: "sine",
			frequency: 440,
			duration: 0.03,
			attack: 0.001,
			decay: 0.029,
			volume: 0.02,
		},
	},
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
	if (!audioCtx) audioCtx = new AudioContext();
	return audioCtx;
}

function synthesize(profile: SoundProfile): void {
	try {
		const ctx = getAudioContext();
		if (ctx.state === "suspended") {
			ctx.resume();
			return;
		}
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = profile.oscType;
		osc.frequency.value = profile.frequency;
		gain.gain.setValueAtTime(0, ctx.currentTime);
		gain.gain.linearRampToValueAtTime(
			profile.volume,
			ctx.currentTime + profile.attack,
		);
		gain.gain.linearRampToValueAtTime(
			0,
			ctx.currentTime + profile.attack + profile.decay,
		);
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start(ctx.currentTime);
		osc.stop(ctx.currentTime + profile.duration);
	} catch {
		// UI sounds are optional
	}
}

export function playUI(event: UIEvent, style?: UIStyleId): void {
	const s = style ?? getActiveUIStyleId();
	const profile = PROFILES[s]?.[event] ?? PROFILES["ambient-ai"][event];
	if (profile) synthesize(profile);
}

export function playClick(style?: UIStyleId) {
	playUI("click", style);
}

export function playToggle(style?: UIStyleId) {
	playUI("toggle", style);
}
