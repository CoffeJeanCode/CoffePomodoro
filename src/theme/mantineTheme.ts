import { createTheme } from "@mantine/core";

const glassSurface = {
	background: "var(--ui-glass-bg)",
	backdropFilter: "var(--ui-glass-blur)",
	border:
		"var(--ui-border-width) var(--ui-border-style) var(--ui-glass-border)",
};

/**
 * Opaque surface for layered overlays (drawers, menus). Translucent glass on
 * these elements lets content underneath bleed through and hurts legibility,
 * so they get a solid theme surface instead.
 */
const solidSurface = {
	background: "var(--ui-surface)",
	border: "1px solid var(--ui-surface-border)",
};

export const appTheme = createTheme({
	primaryColor: "red",
	defaultRadius: "md",
	fontFamily: "var(--ui-font-body)",
	components: {
		Button: {
			defaultProps: {
				variant: "light",
				radius: "md",
			},
			styles: {
				root: {
					transition:
						"background var(--ui-duration) var(--ui-ease), transform 0.2s var(--ui-spring-ease), box-shadow var(--ui-duration) ease",
					backdropFilter: "var(--ui-glass-blur)",
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
					transition:
						"all var(--ui-duration) var(--ui-ease), transform var(--ui-spring-duration) var(--ui-spring-ease)",
					backdropFilter: "var(--ui-glass-blur)",
				},
			},
		},
		Drawer: {
			defaultProps: {
				position: "right",
			},
			styles: {
				content: {
					...solidSurface,
					borderRight: "none",
					borderLeft: "1px solid var(--ui-surface-border)",
				},
				header: {
					...solidSurface,
					borderBottom: "1px solid var(--ui-surface-border)",
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
					...solidSurface,
					borderRadius: "var(--ui-radius-sm)",
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
					backdropFilter: "var(--ui-glass-blur)",
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
