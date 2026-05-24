import ui from "@/styles/ui.module.css";
import { Box } from "@mantine/core";
import type { CSSProperties, ReactNode } from "react";

interface GlassPanelProps {
	children: ReactNode;
	ambientBackground?: string;
	className?: string;
	style?: CSSProperties;
	innerClassName?: string;
	padding?: string | number;
	/** Full-viewport colorful mode (no glass overlay) */
	immersive?: boolean;
}

export function GlassPanel({
	children,
	ambientBackground,
	className,
	style,
	innerClassName,
	padding,
	immersive = false,
}: GlassPanelProps) {
	if (immersive) {
		return (
			<Box
				className={`${ui.immersivePanel} ${className ?? ""}`}
				style={{
					...style,
					padding,
					background: ambientBackground,
				}}
			>
				<Box className={`${ui.glassPanelInner} ${innerClassName ?? ""}`}>
					{children}
				</Box>
			</Box>
		);
	}

	return (
		<Box
			className={`${ui.glassPanel} ${className ?? ""}`}
			style={
				{
					...style,
					padding,
					["--glass-ambient" as string]: ambientBackground ?? "transparent",
				} as CSSProperties
			}
		>
			<Box className={`${ui.glassPanelInner} ${innerClassName ?? ""}`}>
				{children}
			</Box>
		</Box>
	);
}
