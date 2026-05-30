import { Box, Text } from "@mantine/core";
import { type FC, memo } from "react";
import styles from "./BreathingCircle.module.css";

interface BreathingCircleProps {
	large?: boolean;
	isAnimating?: boolean;
	slow?: boolean;
}

const BreathingCircle: FC<BreathingCircleProps> = ({
	large = false,
	isAnimating = true,
	slow = false,
}) => {
	const wrapClass = [styles.wrap, large ? styles.large : "", slow ? styles.slow : ""]
		.filter(Boolean)
		.join(" ");
	const pausedClass = !isAnimating ? styles.paused : "";

	return (
		<Box className={wrapClass}>
			<Box className={styles.outer}>
				<Box className={`${styles.ringOuter} ${pausedClass}`} aria-hidden />
				<Box className={`${styles.ring} ${pausedClass}`} aria-hidden />
				{!large && !slow && (
					<Text size="xs" c="dimmed" ta="center" px="xs" className={styles.label}>
						Breathe
					</Text>
				)}
			</Box>
		</Box>
	);
};

export default memo(BreathingCircle);
