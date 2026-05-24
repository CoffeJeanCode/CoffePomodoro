import { useAppearance } from "@/hooks/useAppearance";
import { type UIStyleId, UI_STYLES, UI_STYLE_ORDER } from "@/theme/uiStyles";
import { Box, Group, Stack, Text } from "@mantine/core";
import type { CSSProperties, FC } from "react";

const optionStyle = (isActive: boolean): CSSProperties =>
	({
		background: isActive ? "var(--ui-accent-primary)" : "var(--ui-surface)",
		border: `var(--ui-border-width) var(--ui-border-style) ${
			isActive ? "var(--ui-accent-primary)" : "var(--ui-surface-border)"
		}`,
		borderRadius: "var(--ui-radius-sm)",
		padding: "0.7rem 0.85rem",
		cursor: "pointer",
		textAlign: "left",
		width: "100%",
		transition: "all var(--ui-duration) var(--ui-ease)",
		color: isActive ? "var(--color-accent-contrast)" : "var(--ui-text)",
	}) as CSSProperties;

const StyleOption: FC<{
	id: UIStyleId;
	isActive: boolean;
	onClick: () => void;
}> = ({ id, isActive, onClick }) => {
	const style = UI_STYLES[id];
	return (
		<button type="button" onClick={onClick} style={optionStyle(isActive)}>
			<Group gap={10} wrap="nowrap" align="center">
				<span aria-hidden style={{ fontSize: "1.35rem", lineHeight: 1 }}>
					{style.icon}
				</span>
				<Box style={{ minWidth: 0 }}>
					<Text size="sm" fw={isActive ? 700 : 600}>
						{style.label}
					</Text>
					<Text size="xs" mt={2} style={{ opacity: 0.78, color: "inherit" }}>
						{style.description}
					</Text>
				</Box>
			</Group>
		</button>
	);
};

const ThemeSettings: FC = () => {
	const { activeStyle, boundToPreset, setUIStyle } = useAppearance();

	return (
		<Stack gap="md">
			<Box>
				<Text size="sm" fw={500}>
					Shape language
				</Text>
				<Text size="xs" c="dimmed" mt={2}>
					Reshapes the whole app — geometry, physics, sound, and color tone. The
					mode meaning (Work/Short/Long) stays constant.
				</Text>
				{boundToPreset && (
					<Text
						size="xs"
						mt={4}
						fw={500}
						style={{ color: "var(--color-accent)" }}
					>
						Saved with the selected preset
					</Text>
				)}
			</Box>

			<Stack gap="xs">
				{UI_STYLE_ORDER.map((id) => (
					<StyleOption
						key={id}
						id={id}
						isActive={id === activeStyle}
						onClick={() => setUIStyle(id)}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default ThemeSettings;
