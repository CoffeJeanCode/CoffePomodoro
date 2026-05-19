export const helps = {
	sections: [
		{
			title: "Flow State",
			icon: "mind",
			items: [
				"Focus without urgency — progress is the ring, not words or countdowns",
				"Set an intention before each session instead of chasing countdowns",
				"End time appears below the ring only while the timer is running",
				"Double-click to update your intention",
				"Ctrl+Shift+D opens the scratch pad (bottom-right) — jot thoughts without leaving focus",
			],
		},
		{
			title: "Break Ideas",
			icon: "break",
			items: [
				"Short Nap",
				"Clean Up",
				"Meditate",
				"Posture",
				"Go outside",
				"Stretches",
				"Mini exercise",
			],
		},
		{
			title: "Soundscapes",
			icon: "sound",
			items: [
				"Rain — steady background for deep concentration",
				"Waves — rhythmic presence to anchor attention",
				"Wind — open space for creative flow",
			],
		},
	],
	hotkeys: {
		main: [
			{ key: "Space", action: "Toggle timer (play / pause)" },
			{ key: "N", action: "Skip to next segment" },
			{ key: "S", action: "End session (focus) or skip (break)" },
			{ key: "+ / -", action: "Adjust session length for this cycle" },
			{ key: "F", action: "Toggle full screen" },
			{ key: "P", action: "Toggle Picture-in-Picture" },
			{ key: "shift+[q-p]", action: "Quick-select a preset schema" },
		],
	},
};
