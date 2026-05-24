import { createTheme } from "@mantine/core";

const glassSurface = {
	background: "var(--ui-glass-bg)",
	backdropFilter: "var(--ui-glass-blur)",
	border:
		"var(--ui-border-width) var(--ui-border-style) var(--ui-glass-border)",
};

const solidSurface = {
	background: "var(--ui-surface)",
	border: "var(--ui-border-width) solid var(--ui-surface-border)",
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
						"background var(--ui-duration) var(--ui-ease), transform var(--ui-spring-duration) var(--ui-spring-ease), box-shadow var(--ui-duration) var(--ui-ease)",
					backdropFilter: "var(--ui-glass-blur)",
					border: "var(--ui-border-width) var(--ui-border-style) var(--ui-border-color)",
					boxShadow: "var(--ui-shadow-sm)",
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
					border: "var(--ui-border-width) var(--ui-border-style) var(--ui-border-color)",
					boxShadow: "var(--ui-shadow-sm)",
				},
			},
		},
		Drawer: {
			defaultProps: {
				position: "right",
			},
			styles: {
				content: {
					background: "var(--ui-surface)",
					opacity: "1 !important",
					border: "var(--ui-border-width) solid var(--ui-surface-border)",
					borderRight: "none",
					borderLeft: "var(--ui-border-width) solid var(--ui-surface-border)",
				},
				header: {
					background: "var(--ui-surface)",
					opacity: "1 !important",
					borderBottom: "var(--ui-border-width) solid var(--ui-surface-border)",
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
					background: "var(--ui-surface)",
					opacity: "1 !important",
					border: "var(--ui-border-width) solid var(--ui-surface-border)",
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
					background: "var(--ui-surface)",
					border: "var(--ui-border-width) solid var(--ui-surface-border)",
					color: "var(--ui-text)",
					transition:
						"border-color var(--ui-duration) var(--ui-ease), background var(--ui-duration) var(--ui-ease)",
				},
			},
		},
		TextInput: {
			styles: {
				input: {
					background: "var(--ui-surface)",
					border: "var(--ui-border-width) solid var(--ui-surface-border)",
					color: "var(--ui-text)",
				},
			},
		},
		NumberInput: {
			styles: {
				input: {
					background: "var(--ui-surface)",
					border: "var(--ui-border-width) solid var(--ui-surface-border)",
					color: "var(--ui-text)",
				},
			},
		},
		Select: {
			styles: {
				input: {
					background: "var(--ui-surface)",
					border: "var(--ui-border-width) solid var(--ui-surface-border)",
					color: "var(--ui-text)",
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