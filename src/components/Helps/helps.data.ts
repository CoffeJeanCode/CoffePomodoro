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
				key: "N",
				action:
					"Skip or go to next segment (N). During a Pomodoro, counting toward session stats follows Behavior → minimum progress for skip",
			},
			{ key: "S", action: "Stop timer" },
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
