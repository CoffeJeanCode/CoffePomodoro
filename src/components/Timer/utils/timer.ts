import { Mode } from "@/models";

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
	shade: number = 8,
): `${"red" | "green" | "blue"}.${number}` =>
	`${getColorMode(mode)}.${shade}`;

/** Hex colors for PiP / raw CSS (gradients, buttons). Mantine-aligned. */
const MODE_HEX: Record<
	"red" | "green" | "blue",
	{ gradient: [string, string]; btn: string; btnHover: string }
> = {
	red: {
		gradient: ["#e03131", "#c92a2a"],
		btn: "#c92a2a",
		btnHover: "#b02525",
	},
	green: {
		gradient: ["#2f9e44", "#2b8a3e"],
		btn: "#2b8a3e",
		btnHover: "#267a37",
	},
	blue: {
		gradient: ["#1c7ed6", "#1971c2"],
		btn: "#1971c2",
		btnHover: "#1864ab",
	},
};

export const getModeHexColors = (mode: Mode) => {
	const base = getColorMode(mode);
	const { gradient, btn, btnHover } = MODE_HEX[base];
	return {
		bgGradient: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
		btnMain: btn,
		btnMainHover: btnHover,
	};
};