import ui from "@/styles/ui.module.css";
import { Box } from "@mantine/core";
import { type CSSProperties, type ReactNode, memo } from "react";

interface GlassPanelProps {
	children: ReactNode;
	ambientBackground?: string;
	className?: string;
	style?: CSSProperties;
	innerClassName?: string;
	padding?: string | number;
	immersive?: boolean;
}

const GlassPanelImpl = ({
	children,
	ambientBackground,
	className,
	style,
	innerClassName,
	padding,
	immersive = false,
}: GlassPanelProps) => {
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
};

export const GlassPanel = memo(GlassPanelImpl);
