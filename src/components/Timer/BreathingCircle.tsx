import ui from "@/styles/ui.module.css";
import { Box, Text } from "@mantine/core";
import { type FC, memo } from "react";
import styles from "./BreathingCircle.module.css";

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
				className={styles.outer}
				style={{ ["--outer-size" as string]: `${outerSize}px` }}
			>
				<Box
					className={`${ui.breathingRingOuter} ${!isAnimating ? ui.breathingPaused : ""}`}
					style={{ width: outerSize, height: outerSize }}
					aria-hidden
				/>
				<Box
					className={`${ui.breathingRing} ${!isAnimating ? ui.breathingPaused : ""}`}
					style={{ ["--ring-size" as string]: `${ringSize}px` }}
					aria-hidden
				/>
				{!large && (
					<Text
						size="xs"
						c="dimmed"
						ta="center"
						px="xs"
						className={styles.label}
					>
						Breathe
					</Text>
				)}
			</Box>
		</Box>
	);
};

export default memo(BreathingCircle);
