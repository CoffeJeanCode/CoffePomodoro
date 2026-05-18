import { createTheme } from "@mantine/core";

const glassSurface = {
	background: "rgba(10, 14, 20, 0.88)",
	backdropFilter: "var(--ui-glass-blur)",
	border: "1px solid var(--ui-glass-border)",
};

export const appTheme = createTheme({
	primaryColor: "red",
	defaultRadius: "md",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	transitionTimingFunction: "var(--ui-ease)",
	components: {
		Button: {
			defaultProps: {
				variant: "light",
				radius: "md",
			},
			styles: {
				root: {
					transition:
						"background var(--ui-duration) var(--ui-ease), transform 0.2s ease, box-shadow var(--ui-duration) ease",
					backdropFilter: "blur(8px)",
				},
			},
		},
		ActionIcon: {
			defaultProps: {
				variant: "light",
				radius: "xl",
			},
			styles: {
				root: {
					transition: "all var(--ui-duration) var(--ui-ease)",
					backdropFilter: "blur(8px)",
				},
			},
		},
		Drawer: {
			defaultProps: {
				position: "right",
			},
			styles: {
				content: {
					...glassSurface,
					borderRight: "none",
					borderLeft: "1px solid var(--ui-glass-border)",
				},
				header: {
					...glassSurface,
					borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
				},
				title: {
					fontWeight: 600,
					letterSpacing: "-0.01em",
				},
			},
		},
		Menu: {
			styles: {
				dropdown: {
					...glassSurface,
					boxShadow: "var(--ui-shadow)",
				},
				item: {
					transition: "background var(--ui-duration) var(--ui-ease)",
				},
			},
		},
		Tabs: {
			styles: {
				tab: {
					transition:
						"color var(--ui-duration) var(--ui-ease), border-color var(--ui-duration) var(--ui-ease)",
				},
				list: {
					borderColor: "var(--ui-glass-border)",
				},
			},
		},
		Textarea: {
			styles: {
				input: {
					background: "var(--ui-glass-bg)",
					border: "1px solid var(--ui-glass-border)",
					transition:
						"border-color var(--ui-duration) var(--ui-ease), background var(--ui-duration) var(--ui-ease)",
				},
			},
		},
		TextInput: {
			styles: {
				input: {
					background: "var(--ui-glass-bg)",
					border: "1px solid var(--ui-glass-border)",
				},
			},
		},
		NumberInput: {
			styles: {
				input: {
					background: "var(--ui-glass-bg)",
					border: "1px solid var(--ui-glass-border)",
				},
			},
		},
		Select: {
			styles: {
				input: {
					background: "var(--ui-glass-bg)",
					border: "1px solid var(--ui-glass-border)",
				},
			},
		},
		Badge: {
			styles: {
				root: {
					backdropFilter: "blur(8px)",
					textTransform: "none",
					fontWeight: 500,
				},
			},
		},
		Title: {
			styles: {
				root: {
					letterSpacing: "-0.02em",
				},
			},
		},
	},
});
