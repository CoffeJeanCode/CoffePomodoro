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
	/** Accent color for minimal wireframe border */
	accentBorder?: string;
}

export function GlassPanel({
	children,
	ambientBackground,
	className,
	style,
	innerClassName,
	padding,
	immersive = false,
	accentBorder,
}: GlassPanelProps) {
	const cssVars: Record<string, string> = {};
	if (ambientBackground !== undefined) {
		cssVars["--glass-ambient"] = ambientBackground;
	}
	if (accentBorder !== undefined) {
		cssVars["--glass-accent-border"] = accentBorder;
	}

	if (immersive) {
		return (
			<Box
				className={`${ui.immersivePanel} ${className ?? ""}`}
				style={{ ...style, ...cssVars, padding, background: ambientBackground }}
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
			style={{ ...style, ...cssVars }}
		>
			<Box className={`${ui.glassPanelInner} ${innerClassName ?? ""}`}>
				{children}
			</Box>
		</Box>
	);
}