import { DRAWER_POSITION, DRAWER_TRANSITION } from "@/theme/uiTokens";
import { Drawer, type DrawerProps } from "@mantine/core";
import type { FC } from "react";

/** Side drawer shell — same position and transition app-wide. */
export const AppDrawer: FC<DrawerProps> = ({
	position = DRAWER_POSITION,
	transitionProps = DRAWER_TRANSITION,
	...props
}) => (
	<Drawer position={position} transitionProps={transitionProps} {...props} />
);
