import { type UIStyleId, getActiveUIStyleId } from "@/theme/activeStyle";

/** UI sound events mapped to style-specific synthesis profiles. */
type UIEvent = "click" | "toggle" | "fulfill" | "transition";

/** Per-style synthesis config */
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
	rustico: {
		click: {
			oscType: "sine",
			frequency: 220,
			duration: 0.08,
			attack: 0.01,
			decay: 0.07,
			volume: 0.06,
		},
		toggle: {
			oscType: "sine",
			frequency: 330,
			duration: 0.12,
			attack: 0.008,
			decay: 0.112,
			volume: 0.05,
		},
		fulfill: {
			oscType: "triangle",
			frequency: 440,
			duration: 0.25,
			attack: 0.02,
			decay: 0.23,
			volume: 0.08,
		},
		transition: {
			oscType: "sine",
			frequency: 165,
			duration: 0.15,
			attack: 0.01,
			decay: 0.14,
			volume: 0.04,
		},
	},
	minimal: {
		click: {
			oscType: "sine",
			frequency: 1200,
			duration: 0.02,
			attack: 0.001,
			decay: 0.019,
			volume: 0.04,
		},
		toggle: {
			oscType: "sine",
			frequency: 900,
			duration: 0.03,
			attack: 0.001,
			decay: 0.029,
			volume: 0.035,
		},
		fulfill: {
			oscType: "sine",
			frequency: 660,
			duration: 0.06,
			attack: 0.002,
			decay: 0.058,
			volume: 0.06,
		},
		transition: {
			oscType: "sine",
			frequency: 440,
			duration: 0.04,
			attack: 0.001,
			decay: 0.039,
			volume: 0.03,
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

/** Play a UI sound with style-specific timbre. */
export function playUI(event: UIEvent, style?: UIStyleId): void {
	const s = style ?? getActiveUIStyleId();
	const profile = PROFILES[s]?.[event] ?? PROFILES.ciberpunk[event];
	if (profile) synthesize(profile);
}

/** Shortcut aliases for backward compatibility. */
export function playClick(style?: UIStyleId) {
	playUI("click", style);
}

export function playToggle(style?: UIStyleId) {
	playUI("toggle", style);
}
