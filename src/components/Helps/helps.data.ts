export const helps = {
	breaks: [
		"Short Nap",
		"Clean Up",
		"Meditate",
		"Posture",
		"Go outside",
		"Stretches",
		"Mini exercise",
	],
	hotkeys: {
		main: [
			{ key: "Space", action: "Toggle timer" },
			{
				key: "Hold ring center",
				action:
					"During focus, press and hold the center of the progress ring to briefly see when the cycle ends (no countdown shown by default)",
			},
			{
				key: "N",
				action:
					"Skip or go to next segment (N). During a Pomodoro, counting toward session stats follows Behavior → minimum progress for skip",
			},
			{
				key: "S",
				action:
					"End focus session (resets timer). During a break, skips to the next Pomodoro",
			},
			{
				key: "+ / -",
				action:
					"Add or subtract the session adjust step in minutes (Behavior settings; this session only)",
			},
			{ key: "F", action: "Full screen" },
			{ key: "shift+[q-p]", action: "Select schema" },
		],
	},
};
