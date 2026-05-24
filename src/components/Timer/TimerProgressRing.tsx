import type { Mode } from "@/models";
import {
	formatCycleHorizonMessage,
	getCycleEndTimeDisplay,
} from "@/utils/temporalHorizon";
import { Box, Text, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type FC, memo, useMemo } from "react";
import styles from "./styles/Timer.module.css";
import { getModeHexColors } from "./utils/timer";

interface TimerProgressRingProps {
	mode: Mode;
	sessionProgressPercent: number;
	isRunning: boolean;
	compact?: boolean;
	large?: boolean;
	centerLabel?: string;
	/** Focus intention shown small inside the ring during abstract sessions */
	sessionIntention?: string;
	/** Hide phase words in the ring center during focus */
	abstractSession?: boolean;
	finishTimeText?: string;
	finishTime?: number;
	/** Double-click ring center to edit intention mid-session */
	canEditIntention?: boolean;
	onEditIntention?: () => void;
}

const TimerProgressRing: FC<TimerProgressRingProps> = ({
	mode,
	sessionProgressPercent,
	isRunning,
	compact = false,
	large = false,
	centerLabel,
	sessionIntention = "",
	abstractSession = false,
	finishTimeText = "",
	finishTime = 0,
	canEditIntention = false,
	onEditIntention,
}) => {
	const isMobile = useMediaQuery("(max-width: 30rem)");
	const intentionMode = Boolean(centerLabel);

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
	const offset = circumference - (sessionProgressPercent / 100) * circumference;
	const { btnMain } = getModeHexColors(mode);

	const coreSize = Math.round(radius * 1.45);
	const rippleSize = Math.round(radius * 2.1);

	const endTimeDisplay = useMemo(
		() => getCycleEndTimeDisplay(finishTimeText, finishTime, isRunning),
		[finishTime, finishTimeText, isRunning],
	);

	const horizonAria = useMemo(
		() => formatCycleHorizonMessage(finishTimeText, finishTime, isRunning),
		[finishTime, finishTimeText, isRunning],
	);

	const intentionText = sessionIntention?.trim() ?? "";
	const showIntentionInRing =
		isRunning && abstractSession && !intentionMode && intentionText.length > 0;
	const showBottomHorizon =
		isRunning && !intentionMode && Boolean(endTimeDisplay);

	const ring = (
		<Box
			className={`${styles.ringWrap} ${canEditIntention ? styles.ringWrapEditable : ""}`}
			role="progressbar"
			aria-valuenow={sessionProgressPercent}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label={
				canEditIntention
					? "Session progress. Double-click to edit intention"
					: showBottomHorizon
						? `${horizonAria}. Session progress`
						: "Session progress"
			}
			style={{ width: size, height: size }}
			onDoubleClick={canEditIntention ? () => onEditIntention?.() : undefined}
		>
			<svg
				className={styles.ringSvg}
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				aria-hidden
				style={{ pointerEvents: "none" }}
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="var(--ui-ring-track)"
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
						style={{
							width: rippleSize,
							height: rippleSize,
							pointerEvents: "none",
						}}
						aria-hidden
					/>
					<Box
						className={`${styles.ringRipple} ${styles.ringRippleDelay}`}
						style={{
							width: rippleSize,
							height: rippleSize,
							pointerEvents: "none",
						}}
						aria-hidden
					/>
				</>
			)}

			<Box
				className={`${styles.ringCore} ${isRunning ? styles.ringCoreRunning : ""} ${!isRunning && !intentionMode ? styles.ringCorePaused : ""}`}
				style={{ width: coreSize, height: coreSize }}
			>
				<Box className={styles.ringCoreInner}>
					{!isRunning && !intentionMode && (
						<Box className={styles.ringPausedMark} aria-hidden />
					)}
					{showIntentionInRing && (
						<Text className={styles.ringIntention} lineClamp={3}>
							{intentionText}
						</Text>
					)}
					{intentionMode && centerLabel && (
						<Text className={styles.ringCenterLabel} px={8} size="xs">
							{centerLabel}
						</Text>
					)}
				</Box>
			</Box>
		</Box>
	);

	return (
		<Box
			className={styles.ringCluster}
			style={{
				["--ring-accent" as string]: `${btnMain}44`,
				["--ring-accent-soft" as string]: `${btnMain}66`,
				["--ring-accent-glow" as string]: `${btnMain}33`,
			}}
		>
			{canEditIntention ? (
				<Tooltip
					label="Double-click the ring to edit your intention"
					position="top"
					withArrow
					openDelay={400}
					events={{ hover: true, focus: true, touch: false }}
				>
					{ring}
				</Tooltip>
			) : (
				ring
			)}

			{showBottomHorizon && (
				<Box className={styles.cycleHorizon} aria-hidden>
					<Text className={styles.cycleHorizonCaption}>ends</Text>
					<Text className={styles.cycleHorizonTime}>{endTimeDisplay}</Text>
				</Box>
			)}
		</Box>
	);
};

export default memo(TimerProgressRing);
