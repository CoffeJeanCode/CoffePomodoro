import type { Mode } from "@/models";
import { formatCycleHorizonMessage } from "@/utils/temporalHorizon";
import { Box, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type FC, memo, useMemo } from "react";
import { useTemporalReveal } from "./hooks/useTemporalReveal";
import styles from "./styles/Timer.module.css";
import { getModeHexColors } from "./utils/timer";

interface TimerProgressRingProps {
	mode: Mode;
	sessionProgressPercent: number;
	isRunning: boolean;
	compact?: boolean;
	large?: boolean;
	centerLabel?: string;
	/** Hide phase words; reveal end time on press-and-hold in the center */
	abstractSession?: boolean;
	finishTimeText?: string;
	finishTime?: number;
	remainingTimeSeconds?: number;
}

const TimerProgressRing: FC<TimerProgressRingProps> = ({
	mode,
	sessionProgressPercent,
	isRunning,
	compact = false,
	large = false,
	centerLabel,
	abstractSession = false,
	finishTimeText = "",
	finishTime = 0,
	remainingTimeSeconds = 0,
}) => {
	const isMobile = useMediaQuery("(max-width: 30rem)");
	const intentionMode = Boolean(centerLabel);
	const { revealed, revealHandlers } = useTemporalReveal(
		abstractSession && !intentionMode,
	);

	const size = intentionMode
		? 152
		: large
			? 280
			: compact
				? 168
				: isMobile
					? 158
					: 168;
	const stroke = isMobile ? 4 : 5;
	const ringInset = intentionMode ? 6 : large ? 10 : 14;
	const radius = (size - stroke) / 2 - ringInset;
	const circumference = 2 * Math.PI * radius;
	const offset =
		circumference - (sessionProgressPercent / 100) * circumference;
	const { btnMain } = getModeHexColors(mode);

	const coreSize = Math.round(radius * 1.45);
	const rippleSize = Math.round(radius * 2.1);

	const horizonMessage = useMemo(
		() =>
			formatCycleHorizonMessage(
				finishTimeText,
				finishTime,
				remainingTimeSeconds,
			),
		[finishTime, finishTimeText, remainingTimeSeconds],
	);

	const showPhaseLabel = !abstractSession && !intentionMode;
	const showHorizon = abstractSession && revealed && !intentionMode;

	return (
		<Box
			className={styles.ringWrap}
			role="progressbar"
			aria-valuenow={sessionProgressPercent}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label={
				showHorizon
					? horizonMessage
					: "Session progress"
			}
			style={{
				width: size,
				height: size,
				touchAction: abstractSession ? "manipulation" : undefined,
				["--ring-accent" as string]: `${btnMain}44`,
				["--ring-accent-soft" as string]: `${btnMain}66`,
				["--ring-accent-glow" as string]: `${btnMain}33`,
			}}
		>
			<svg
				className={styles.ringSvg}
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				aria-hidden
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="rgba(255,255,255,0.08)"
					strokeWidth={stroke}
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke={btnMain}
					strokeWidth={stroke}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					transform={`rotate(-90 ${size / 2} ${size / 2})`}
					style={{
						transition: isRunning
							? "stroke-dashoffset 2s ease-in-out"
							: "stroke-dashoffset 1s ease",
						filter: "blur(0.5px)",
					}}
				/>
			</svg>

			{isRunning && (
				<>
					<Box
						className={styles.ringRipple}
						style={{ width: rippleSize, height: rippleSize }}
						aria-hidden
					/>
					<Box
						className={`${styles.ringRipple} ${styles.ringRippleDelay}`}
						style={{ width: rippleSize, height: rippleSize }}
						aria-hidden
					/>
				</>
			)}

			<Box
				{...revealHandlers}
				className={`${styles.ringCore} ${isRunning ? styles.ringCoreRunning : ""} ${abstractSession ? styles.ringCoreInteractive : ""}`}
				style={{
					width: coreSize,
					height: coreSize,
					cursor: abstractSession ? "pointer" : "default",
				}}
				role={abstractSession ? "button" : undefined}
				tabIndex={abstractSession ? 0 : undefined}
				aria-label={
					abstractSession
						? revealed
							? horizonMessage
							: "Mantén presionado para ver cuándo termina el ciclo"
						: undefined
				}
			>
				{showPhaseLabel && (
					<Text
						className={styles.ringCenterLabel}
						aria-hidden
						style={{
							fontSize: large ? "1rem" : compact || isMobile ? "0.8rem" : "0.9rem",
						}}
					>
						{getProgressLabel(sessionProgressPercent)}
					</Text>
				)}
				{abstractSession && (
					<Text
						className={`${styles.ringHorizon} ${showHorizon ? styles.ringHorizonVisible : styles.ringHorizonHidden}`}
						aria-hidden={!showHorizon}
					>
						{horizonMessage}
					</Text>
				)}
				{intentionMode && centerLabel && (
					<Text className={styles.ringCenterLabel} px={8}>
						{centerLabel}
					</Text>
				)}
			</Box>
		</Box>
	);
};

function getProgressLabel(percent: number): string {
	if (percent < 20) return "Beginning";
	if (percent < 40) return "Focusing";
	if (percent < 60) return "Flowing";
	if (percent < 80) return "Deep";
	if (percent < 95) return "Winding down";
	return "Finishing";
}

export default memo(TimerProgressRing);
