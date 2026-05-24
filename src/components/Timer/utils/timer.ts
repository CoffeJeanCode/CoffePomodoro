import { Mode } from "@/models";
import { MODE_COLORS } from "@/theme/palette";

/** Next mode: after Nth pomodoro → long break; after other pomodoros → short break; after any break → pomodoro. */
export const getNewMode = (
	mode: Mode,
	pomodoros: number,
	pomodorosToLongBreak: number,
) =>
	mode === Mode.Pomodoro
		? pomodoros === pomodorosToLongBreak
			? Mode.LongBreak
			: Mode.ShortBreak
		: Mode.Pomodoro;

/** Base Mantine color key per mode: red (work), green (short break), blue (long break). */
export const getColorMode = (mode: Mode): "red" | "green" | "blue" => {
	switch (mode) {
		case Mode.Pomodoro:
			return "red";
		case Mode.ShortBreak:
			return "green";
		case Mode.LongBreak:
			return "blue";
	}
};

/** Mantine color prop e.g. "red.8" for buttons, backgrounds. */
export const getColorModeKey = (
	mode: Mode,
	shade = 8,
): `${"red" | "green" | "blue"}.${number}` => `${getColorMode(mode)}.${shade}`;

/** Mode key used to look up theme mode palettes. */
const modeKey = (mode: Mode): "work" | "short" | "long" => {
	switch (mode) {
		case Mode.Pomodoro:
			return "work";
		case Mode.ShortBreak:
			return "short";
		case Mode.LongBreak:
			return "long";
	}
};

/** Darken a hex color toward black by `amount` (0..1). */
const shade = (hex: string, amount: number): string => {
	const n = Number.parseInt(hex.slice(1), 16);
	const r = Math.round(((n >> 16) & 255) * (1 - amount));
	const g = Math.round(((n >> 8) & 255) * (1 - amount));
	const b = Math.round((n & 255) * (1 - amount));
	return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

/** Fixed semantic accent for a given mode (focus / short break / long break). */
export const getModeAccent = (mode: Mode): string => MODE_COLORS[modeKey(mode)];

/** Hex colors for PiP / raw CSS (gradients, buttons), resolved per active theme. */
export const getModeHexColors = (mode: Mode) => {
	const btn = getModeAccent(mode);
	const btnHover = shade(btn, 0.12);
	return {
		bgGradient: `linear-gradient(135deg, ${btn} 0%, ${shade(btn, 0.08)} 100%)`,
		btnMain: btn,
		btnMainHover: btnHover,
	};
};
