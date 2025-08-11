import { useStatsState } from "@/stores/states/stats";
import { secondsToMinutes } from "@/utils/time.util";
import {
	Button,
	Container,
	Drawer,
	Flex,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { keys } from "ramda";
import { useEffect, useRef, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import * as Plot from "@observablehq/plot";

type PlotData = {
	day: string;
	sessions: number;
	time: number;
}

const Stats = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { stats } = useStatsState();
	const { colors } = useMantineTheme();

	const chartRef = useRef<HTMLDivElement | null>(null);
	const plotRef = useRef<any>(null);

	const plotData: PlotData[] = keys(stats).map((day, index) => ({
		day: day.toString(),
		sessions: stats[day].sessions,
		time: secondsToMinutes(stats[day].time)
	}));

	const cleanupPlot = () => {
		if (plotRef.current) {
			plotRef.current.remove();
			plotRef.current = null;
		}
	};

	const createChart = () => {
		if (!chartRef.current || plotData.length === 0) return;

		cleanupPlot();

		const maxSessions = Math.max(...plotData.map(x => x.sessions));
		const minSessions = Math.min(...plotData.map(x => x.sessions));
		const maxTime = Math.max(...plotData.map(x => x.time));
		const minTime = Math.min(...plotData.map(x => x.time));

		const normalizedTime = (d: PlotData) => (d.time - minTime) / (maxTime - minTime) * (maxSessions - minSessions) + minSessions;

		const plot = Plot.plot({
			width: chartRef.current.clientWidth,
			height: 300,
			marginTop: 30,
			marginLeft: 60,
			marginBottom: 60,
			style: {
				fontSize: "13px",
				fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
			},
			x: {
				label: "Days",
				ariaLabel: "Days of the Week",
				domain: plotData.map(d => d.day),
				tickFormat: (d: string) => d.charAt(0).toUpperCase() + d.slice(1, 3),
			},
			y: {
				grid: true,
				nice: true,
				label: "Productivity"
			},
			marks: [
				Plot.barY(plotData, {
					x: "day",
					y: "sessions",
					fill: colors.red[6],
					rx: 6,
					tip: {
						fill: colors.dark[7],
						stroke: colors.dark[4],
						strokeWidth: 1,
						textAnchor: "middle",
						fontSize: "16px",
						fontWeight: 500,
						dx: 0,
						dy: -10,
						pointerEvents: "none",
					},
					title: (d: PlotData) => `${d.day}: ${d.sessions} Sessions (${d.time} Min)`,
				}),
				Plot.lineY(plotData, {
					x: "day",
					y: normalizedTime,
					curve: "natural",
					stroke: colors.blue[6],
					strokeWidth: 3,
					marker: "dot",
				})
			]
		});

		chartRef.current.appendChild(plot);
		plotRef.current = plot;
	};

	// Handle drawer open/close
	useEffect(() => {
		if (!isOpen) {
			cleanupPlot();
			return;
		}

		// Delay chart creation to allow drawer animation
		const timeout = setTimeout(createChart, 100);

		return () => {
			clearTimeout(timeout);
			cleanupPlot();
		};
	}, [isOpen, plotData, colors]);

	return (
		<>
			<Button leftSection={<FaChartBar />} onClick={() => setIsOpen(true)}>
				Week Stats
			</Button>
			<Drawer
				opened={isOpen}
				position="bottom"
				size={450}
				onClose={() => setIsOpen(false)}
			>
				<Container h="100%">
					<Flex justify="center" align="center" gap="md">
						<Title order={2} size={35}>
							Stats
						</Title>
					</Flex>
					<article ref={chartRef} style={{ width: "100%" }} />
				</Container>
			</Drawer>
		</>
	);
};

export default Stats;
