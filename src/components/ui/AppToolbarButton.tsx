import { Button, type ButtonProps } from "@mantine/core";
import type { FC, ReactNode } from "react";

interface AppToolbarButtonProps extends ButtonProps {
	children: ReactNode;
	leftSection?: ReactNode;
}

/** Top-bar actions — same glass look as the timer shell. */
export const AppToolbarButton: FC<AppToolbarButtonProps> = ({
	children,
	leftSection,
	...props
}) => (
	<Button
		variant="light"
		color="gray"
		radius="md"
		leftSection={leftSection}
		styles={{
			root: {
				background: "var(--ui-glass-bg)",
				border: "1px solid var(--ui-glass-border)",
				backdropFilter: "blur(12px)",
				color: "var(--ui-text)",
				transition: "all var(--ui-duration) var(--ui-ease)",
			},
		}}
		{...props}
	>
		{children}
	</Button>
);
