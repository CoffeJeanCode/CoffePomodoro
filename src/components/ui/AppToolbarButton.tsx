import { Button, type ButtonProps } from "@mantine/core";
import type { MouseEventHandler, ReactNode } from "react";

export interface AppToolbarButtonProps
	extends Omit<ButtonProps, "children" | "leftSection"> {
	children: ReactNode;
	leftSection?: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

/** Top-bar actions — same glass look as the timer shell. */
export function AppToolbarButton({
	children,
	leftSection,
	...props
}: AppToolbarButtonProps) {
	return (
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
}
