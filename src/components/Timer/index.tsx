import { useInfoState } from "@/stores";
import {
	Box,
	Center,
	Container,
	type MantineTheme,
	Stack,
} from "@mantine/core";
import { memo, useRef } from "react";
import TimerControllers from "./TimerControllers";
import TimerHeader from "./TimerHeader";
import TimerInfo from "./TimerInfo";
import TimerText from "./TimerText";
import TimerViewControls from "./TimerViewControls";
import usePictureInPicture from "./hooks/usePictureInPicture";
import useTimer from "./hooks/useTimer";
import { useTimerDocumentAndHotkeys } from "./hooks/useTimerDocumentAndHotkeys";
import { useTimerFullscreen } from "./hooks/useTimerFullscreen";
import { getColorMode } from "./utils/timer";

const Timer = () => {
	const {
		handleAdjustSessionByMinutes,
		handleNextTimer,
		handleStopTimer,
		handleToggleTimer,
		isRunning,
		remainingTimeText,
		sessionAdjustStepMinutes,
		sessionProgressPercent,
		skipCountsSessionMinProgressPercent,
	} = useTimer();
	const { mode } = useInfoState();
	const timerRef = useRef<HTMLDivElement>(null);

	const { isFullScreen, handleFullScreen } = useTimerFullscreen(timerRef);

	const { handlePictureInPicture, isPiPOpen } = usePictureInPicture({
		handleToggleTimer,
		handleStopTimer,
		handleNextTimer,
		handleAdjustSessionByMinutes,
		sessionAdjustStepMinutes,
		skipCountsSessionMinProgressPercent,
	});

	useTimerDocumentAndHotkeys({
		mode,
		remainingTimeText,
		handleToggleTimer,
		handleStopTimer,
		handleNextTimer,
		handleFullScreen,
		handlePictureInPicture,
		handleAdjustSessionByMinutes,
	});

	return (
		<Container px={0}>
			<Box
				ref={timerRef}
				style={(theme: MantineTheme) => {
					const base = getColorMode(mode);
					const baseColor = theme.colors[base][8];

					// --- MEGA VIBRANT PALETTE (Based on your image) ---
					const bgDeep = "#080b14"; // Ultra dark navy/black base
					const colorMagenta = "#ff007f"; // Neon Pink
					const colorOrange = "#ff4500"; // Vibrant Orange
					const colorYellow = "#ffd700"; // Bright Sun Yellow
					const colorCyan = "#00e5ff"; // Electric Blue/Cyan
					const colorPurple = "#8a2be2"; // Deep Violet

					// --- DYNAMIC ORBIT MATH ---
					// This makes the colors swirl in curves and figure-8s instead of straight lines
					const p = sessionProgressPercent;
					const swirlX1 = 50 + Math.sin(p * 0.1) * 40; // Swings left to right (10% to 90%)
					const swirlY1 = 50 + Math.cos(p * 0.1) * 40; // Swings top to bottom
					const swirlX2 = 50 + Math.sin(p * 0.08 + Math.PI) * 50;
					const swirlY2 = 50 + Math.cos(p * 0.08 + Math.PI) * 50;

					return {
						minWidth: "min(300px, 30vw)",
						display: isFullScreen ? "flex" : "block",
						alignItems: isFullScreen ? "center" : "initial",
						justifyContent: isFullScreen ? "center" : "initial",

						// --- THE LIVING AURORA BACKGROUND ---
						background: isFullScreen
							? `
                /* 1. Grain Texture */
                url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="a"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(%23a)" opacity="0.3"/></svg>'),
                
                /* 2. Swirling Colors (Using dynamic math) */
                radial-gradient(120% 120% at ${swirlX1}% ${swirlY1}%, ${colorYellow}55 0%, transparent 50%),
                radial-gradient(150% 150% at ${swirlX2}% ${swirlY2}%, ${colorCyan}4D 0%, transparent 60%),
                
                /* 3. Sweeping Progress Colors */
                radial-gradient(120% 120% at ${p}% 100%, ${colorMagenta}66 0%, transparent 60%),
                radial-gradient(100% 100% at 100% ${p}%, ${colorOrange}55 0%, transparent 70%),
                radial-gradient(100% 100% at 0% ${100 - p}%, ${colorPurple}66 0%, transparent 60%),
                
                /* 4. Deep Base */
                ${bgDeep}
              `
							: baseColor,

						padding: isFullScreen
							? 0
							: `${theme.spacing.lg} calc(${theme.spacing.xl} * 2)`,
						borderRadius: isFullScreen ? 0 : theme.spacing.md,
						// Smoothly animate the background as the math updates every second
						transition:
							"background 1s cubic-bezier(0.4, 0, 0.2, 1), all 400ms ease",
					};
				}}
			>
				<Center
					style={{
						flexDirection: "column",
						width: "100%",
						height: isFullScreen ? "100%" : "auto",
					}}
				>
					<Stack
						gap={isFullScreen ? "xl" : "md"}
						style={{
							width: "100%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{/* Header (Hidden in Fullscreen) */}
						<Box
							style={{
								display: "grid",
								gridTemplateRows: isFullScreen ? "0fr" : "1fr",
								opacity: isFullScreen ? 0 : 1,
								transition: "all 400ms ease",
							}}
						>
							<Box style={{ overflow: "hidden" }}>
								<TimerHeader
									mode={mode}
									sessionAdjustStepMinutes={sessionAdjustStepMinutes}
									onAddMinute={() => handleAdjustSessionByMinutes(1)}
									onSubtractMinute={() => handleAdjustSessionByMinutes(-1)}
								/>
							</Box>
						</Box>

						{/* --- THE PRISMATIC GLASS CARD --- */}
						<Box
							style={{
								transform: isFullScreen ? "scale(1.25)" : "scale(1)",
								transformOrigin: "center",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "1.5rem",

								// Advanced Frosted Glass Styling
								background: isFullScreen
									? "rgba(255, 255, 255, 0.05)"
									: "transparent",
								backdropFilter: isFullScreen
									? "blur(24px) saturate(150%)"
									: "none",
								WebkitBackdropFilter: isFullScreen
									? "blur(24px) saturate(150%)"
									: "none",

								// Luminous Border Edge
								border: isFullScreen
									? "1px solid rgba(255, 255, 255, 0.15)"
									: "none",
								borderTop: isFullScreen
									? "1px solid rgba(255, 255, 255, 0.3)"
									: "none",
								borderLeft: isFullScreen
									? "1px solid rgba(255, 255, 255, 0.2)"
									: "none",
								borderRadius: isFullScreen ? "2.5rem" : "0",
								padding: isFullScreen ? "3.5rem 5rem" : "0",

								// Active Breathing Shadow
								boxShadow:
									isFullScreen && isRunning
										? "0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(255,255,255,0.08)"
										: isFullScreen
											? "0 10px 30px rgba(0,0,0,0.3)"
											: "none",

								transition: "all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)", // Springy pop effect
							}}
						>
							<TimerText
								remainingTimeText={remainingTimeText}
								sessionProgressPercent={sessionProgressPercent}
							/>
							<TimerControllers
								mode={mode}
								skipCountsSessionMinProgressPercent={
									skipCountsSessionMinProgressPercent
								}
								handleNextTimer={handleNextTimer}
								handleStopTimer={handleStopTimer}
								handleToggleTimer={handleToggleTimer}
								isPlaying={isRunning}
							/>
						</Box>

						{/* Info (Hidden in Fullscreen) */}
						<Box
							style={{
								display: "grid",
								gridTemplateRows: isFullScreen ? "0fr" : "1fr",
								opacity: isFullScreen ? 0 : 1,
								transition: "all 400ms ease",
							}}
						>
							<Box style={{ overflow: "hidden" }}>
								<TimerInfo />
							</Box>
						</Box>

						{/* View Controls */}
						<Box
							style={{
								opacity: isFullScreen ? 0.4 : 1,
								transition: "opacity 300ms ease",
							}}
						>
							<TimerViewControls
								mode={mode}
								handlePictureInPicture={handlePictureInPicture}
								handleFullScreen={handleFullScreen}
								isPiPOpen={isPiPOpen}
							/>
						</Box>
					</Stack>
				</Center>
			</Box>
		</Container>
	);
};

export default memo(Timer);
