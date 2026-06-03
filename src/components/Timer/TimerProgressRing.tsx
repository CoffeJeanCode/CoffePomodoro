import type { Mode } from "@/models";
import { useLanguage } from "@/context/LanguageContext";
import {
	formatCycleHorizonMessage,
	getCycleEndTimeDisplay,
} from "@/utils/temporalHorizon";
import { Box, Text, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type FC, memo, useMemo } from "react";
import styles from "./TimerProgressRing.module.css";
import TimerCoreShifter from "./TimerCoreShifter";
import { getModeHexColors } from "./utils/timer";

interface TimerProgressRingProps {
	mode: Mode;
	sessionProgressPercent: number;
	isRunning: boolean;
	isBreak: boolean;
	compact?: boolean;
	large?: boolean;
	centerLabel?: string;
	sessionIntention?: string;
	abstractSession?: boolean;
	finishTimeText?: string;
	finishTime?: number;
	canEditIntention?: boolean;
	onEditIntention?: () => void;
}

const TimerProgressRing: FC<TimerProgressRingProps> = ({
	mode,
	sessionProgressPercent,
	isRunning,
	isBreak,
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
	const { t } = useLanguage();
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
	// Kept mounted across play/pause so the meta panel can animate both ways;
	// `metaActive` drives the expand/collapse, not the mount.
	const showIntentionInRing =
		abstractSession && !intentionMode && intentionText.length > 0;
	const showBottomHorizon =
		isRunning && !intentionMode && Boolean(endTimeDisplay);
	const showMeta = !intentionMode && abstractSession;
	const metaActive = isRunning && (showIntentionInRing || showBottomHorizon);

	const ring = (
		<Box
			className={styles.ringWrap}
			style={{ width: size, height: size }}
			role="progressbar"
			aria-valuenow={sessionProgressPercent}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label={
				showBottomHorizon
					? `${horizonAria}. ${t.timer.progress.sessionProgress}`
					: t.timer.progress.sessionProgress
			}
		>
			<svg
				className={styles.ringSvg}
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				aria-hidden="true"
				style={{ pointerEvents: "none" }}
			>
				<title>Timer progress ring</title>
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
				className={styles.ringCore}
				style={{ width: coreSize, height: coreSize }}
			>
				<Box className={styles.ringCoreShifter}>
					<TimerCoreShifter isPlaying={isRunning} isBreak={isBreak} />
				</Box>
				<Box className={styles.ringCoreInner}>
					{!isRunning && !intentionMode && (
						<Box className={styles.ringPausedMark} aria-hidden />
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
			{ring}

			{showMeta && (
				<Box
					className={`${styles.ringMeta} ${
						metaActive ? styles.ringMetaActive : ""
					}`}
				>
					{showIntentionInRing &&
						(canEditIntention ? (
							<Tooltip
								label={t.timer.progress.editIntention}
								position="bottom"
								withArrow
								openDelay={300}
							>
								<Text
									component="button"
									type="button"
									className={`${styles.ringIntention} ${styles.ringIntentionEditable}`}
									lineClamp={2}
									onClick={() => onEditIntention?.()}
									aria-label={t.timer.progress.editIntention}
								>
									{intentionText}
								</Text>
							</Tooltip>
						) : (
							<Text className={styles.ringIntention} lineClamp={2}>
								{intentionText}
							</Text>
						))}

					{showBottomHorizon && (
						<Box className={styles.cycleHorizon} aria-hidden>
							<Text className={styles.cycleHorizonCaption}>
								{t.timer.progress.ends}
							</Text>
							<Text className={styles.cycleHorizonTime}>{endTimeDisplay}</Text>
						</Box>
					)}
				</Box>
			)}
		</Box>
	);
};

export default memo(TimerProgressRing);
