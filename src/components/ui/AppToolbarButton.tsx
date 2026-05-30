import { Button, type ButtonProps } from "@mantine/core";
import { type MouseEventHandler, type ReactNode, memo } from "react";

export interface AppToolbarButtonProps
	extends Omit<ButtonProps, "children" | "leftSection"> {
	children: ReactNode;
	leftSection?: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const toolbarStyles = {
	root: {
		background: "var(--ui-glass-bg)",
		border: "1px solid var(--ui-glass-border)",
		backdropFilter: "blur(12px)",
		color: "var(--ui-text)",
		transition: "all var(--ui-duration) var(--ui-ease)",
	},
} as const;

const AppToolbarButtonImpl = ({
	children,
	leftSection,
	...props
}: AppToolbarButtonProps) => {
	return (
		<Button
			variant="light"
			color="gray"
			radius="md"
			leftSection={leftSection}
			styles={toolbarStyles}
			{...props}
		>
			{children}
		</Button>
	);
};

export const AppToolbarButton = memo(AppToolbarButtonImpl);
