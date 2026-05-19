import { Box, Text } from "@mantine/core";
import { type FC, memo } from "react";
import ui from "@/styles/ui.module.css";

interface BreathingCircleProps {
	large?: boolean;
	isAnimating?: boolean;
}

const BreathingCircle: FC<BreathingCircleProps> = ({
	large = false,
	isAnimating = true,
}) => {
	const ringSize = large ? 136 : 100;
	const outerSize = large ? 180 : 118;

	return (
		<Box className={ui.breathingWrap}>
			<Box
				style={{
					position: "relative",
					width: outerSize,
					height: outerSize,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					className={`${ui.breathingRingOuter} ${!isAnimating ? ui.breathingPaused : ""}`}
					style={{
						width: outerSize,
						height: outerSize,
					}}
					aria-hidden
				/>
				<Box
					className={`${ui.breathingRing} ${!isAnimating ? ui.breathingPaused : ""}`}
					style={{
						width: ringSize,
						height: ringSize,
					}}
					aria-hidden
				/>
				{!large && (
					<Text
						size="xs"
						c="dimmed"
						ta="center"
						px="xs"
						style={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1,
							lineHeight: 1.3,
							pointerEvents: "none",
						}}
					>
						Breathe
					</Text>
				)}
			</Box>
		</Box>
	);
};

export default memo(BreathingCircle);
