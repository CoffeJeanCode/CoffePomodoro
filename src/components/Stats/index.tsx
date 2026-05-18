import { AppToolbarButton } from "@/components/ui/AppToolbarButton";
import { GlassStatCard } from "@/components/ui/GlassStatCard";
import { useStatsState } from "@/stores/states/stats";
import { DRAWER_BOTTOM_TRANSITION, UI_ACCENT, UI_CHART } from "@/theme/uiTokens";
import { calculateProductivityImprovement } from "@/utils/stats.utils";
import { secondsToMinutes } from "@/utils/time.util";
import ui from "@/styles/ui.module.css";
import { Box, Drawer, Flex, Grid, Text } from "@mantine/core";
import * as Plot from "@observablehq/plot";
import { keys } from "ramda";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChartBar, FaCheck, FaClock, FaFire } from "react-icons/fa";

type PlotData = {
	day: string;
	sessions: number;
	time: number;
};

const Stats = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { stats, previousWeek, focusMetrics } = useStatsState();

	const chartRef = useRef<HTMLDivElement | null>(null);
	const plotRef = useRef<(SVGSVGElement | HTMLElement) | null>(null);

	const plotData: PlotData[] = keys(stats).map((day) => ({
		day: day.toString(),
		sessions: stats[day].sessions,
		time: secondsToMinutes(stats[day].time),
	}));

	const hasData = plotData.some((d) => d.sessions > 0 || d.time > 0);

	const currentWeekTotal = plotData.reduce(
		(acc, d) => ({
			sessions: acc.sessions + d.sessions,
			time: acc.time + d.time,
		}),
		{ sessions: 0, time: 0 },
	);

	const improvement = previousWeek
		? calculateProductivityImprovement(previousWeek, stats)
		: null;

	const completionPercent = Math.round(focusMetrics.completionRate * 100);

	const timeDistributionData = keys(focusMetrics.timeDistribution).map(
		(time) => ({
			time,
			minutes: secondsToMinutes(focusMetrics.timeDistribution[time]),
		}),
	);

	const cleanupPlot = useCallback(() => {
		if (plotRef.current) {
			plotRef.current.remove();
			plotRef.current = null;
		}
	}, []);

	const createChart = useCallback(() => {
		if (!chartRef.current || plotData.length === 0) return;

		cleanupPlot();

		const maxSessions = Math.max(...plotData.map((x) => x.sessions), 1);
		const minSessions = Math.min(...plotData.map((x) => x.sessions));
		const maxTime = Math.max(...plotData.map((x) => x.time), 1);
		const minTime = Math.min(...plotData.map((x) => x.time));

		const normalizedTime = (d: PlotData) => {
			if (maxTime === minTime) {
				return minSessions;
			}
			return (
				((d.time - minTime) / (maxTime - minTime)) *
					(maxSessions - minSessions) +
				minSessions
			);
		};

		const plot = Plot.plot({
			width: chartRef.current.clientWidth,
			height: 200,
			marginTop: 20,
			marginLeft: 50,
			marginBottom: 40,
			style: {
				fontSize: "12px",
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				color: "var(--ui-text-muted)",
			},
			x: {
				label: "Days",
				domain: plotData.map((d) => d.day),
				tickFormat: (d: string) => d.charAt(0).toUpperCase() + d.slice(1, 3),
			},
			y: {
				grid: true,
				nice: true,
				label: "Sessions",
			},
			marks: [
				Plot.barY(plotData, {
					x: "day",
					y: "sessions",
					fill: UI_CHART.sessions,
					rx: 4,
				}),
				Plot.lineY(plotData, {
					x: "day",
					y: normalizedTime,
					curve: "natural",
					stroke: UI_CHART.time,
					strokeWidth: 2,
				}),
			],
		});

		chartRef.current.appendChild(plot);
		plotRef.current = plot;
	}, [cleanupPlot, plotData]);

	useEffect(() => {
		if (!isOpen || !hasData) {
			cleanupPlot();
			return;
		}

		const timeout = setTimeout(createChart, 100);

		return () => {
			clearTimeout(timeout);
			cleanupPlot();
		};
	}, [isOpen, createChart, cleanupPlot, hasData]);

	useEffect(() => {
		if (!isOpen || !hasData || !chartRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			createChart();
		});

		resizeObserver.observe(chartRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [isOpen, createChart, hasData]);

	const improvementLabel =
		improvement !== null
			? `${improvement > 0 ? "+" : ""}${Math.round(improvement)}%`
			: "—";

	return (
		<>
			<AppToolbarButton
				leftSection={<FaChartBar />}
				onClick={() => setIsOpen(true)}
			>
				Week Stats
			</AppToolbarButton>
			<Drawer
				opened={isOpen}
				position="bottom"
				size="85vh"
				title="Focus Stats"
				onClose={() => setIsOpen(false)}
				transitionProps={DRAWER_BOTTOM_TRANSITION}
				styles={{
					content: { overflowX: "hidden" },
					body: { overflowX: "hidden", maxWidth: "100%" },
				}}
			>
				<Box pt="xs" pb="md">
					{!hasData ? (
						<Flex justify="center" align="center" mih={200}>
							<Text c="dimmed" size="md" ta="center">
								No sessions this week yet. Start a Pomodoro to see your stats!
							</Text>
						</Flex>
					) : (
						<>
							<Grid gutter="sm" mb="md">
								<Grid.Col span={6}>
									<GlassStatCard
										icon={<FaFire color={UI_ACCENT.warning} size={18} />}
										label="Streak"
										value={`${focusMetrics.currentStreak} days`}
										hint={`Best: ${focusMetrics.longestStreak}`}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<GlassStatCard
										icon={<FaCheck color={UI_ACCENT.success} size={18} />}
										label="Completion"
										value={`${completionPercent}%`}
										hint={`${focusMetrics.totalCompleted}/${focusMetrics.totalCompleted + focusMetrics.totalSkipped}`}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<GlassStatCard
										icon={<FaClock color={UI_ACCENT.info} size={18} />}
										label="This week"
										value={`${Math.round(currentWeekTotal.time)}m`}
										hint={`${currentWeekTotal.sessions} sessions`}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<GlassStatCard
										label="vs last week"
										value={improvementLabel}
										hint={previousWeek ? "comparable" : "first week"}
										valueColor={
											improvement !== null && improvement > 0
												? UI_ACCENT.success
												: improvement !== null && improvement < 0
													? UI_ACCENT.primary
													: undefined
										}
									/>
								</Grid.Col>
							</Grid>

							<Text size="sm" c="dimmed" mb="xs" fw={500}>
								Daily sessions
							</Text>
							<article ref={chartRef} style={{ width: "100%" }} />

							{timeDistributionData.some((d) => d.minutes > 0) && (
								<Box mt="md">
									<Text size="sm" c="dimmed" mb="xs" fw={500}>
										Best time of day
									</Text>
									<Flex gap="xs" wrap="wrap">
										{timeDistributionData
											.filter((d) => d.minutes > 0)
											.sort((a, b) => b.minutes - a.minutes)
											.slice(0, 2)
											.map((d) => (
												<Text
													key={d.time}
													component="span"
													className={ui.pillTag}
													c="var(--ui-text)"
												>
													{d.time}: {d.minutes}m
												</Text>
											))}
									</Flex>
								</Box>
							)}
						</>
					)}
				</Box>
			</Drawer>
		</>
	);
};

export default Stats;
