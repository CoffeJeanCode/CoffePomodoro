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
import { keys, map } from "ramda";
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

	const plotData: PlotData[] = keys(stats).sort().map((day) => ({
		day: day.toString(),
		sessions: stats[day].sessions,
		time: secondsToMinutes(stats[day].time)
	}));

	// Cleanup plot instance
	const cleanupPlot = () => {
		if (plotRef.current) {
			plotRef.current.remove();
			plotRef.current = null;
		}
	};

	// Create chart
	const createChart = () => {
		if (!chartRef.current || plotData.length === 0) return;

		cleanupPlot();

		const plot = Plot.plot({
			width: chartRef.current.clientWidth,
			height: 300,
			marginTop: 30,
			marginLeft: 60,
			marginBottom: 80,
			style: {
				fontSize: "13px",
				fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
			},
			x: {
				tickRotate: -45,
				label: "Days"
			},
			y: {
				grid: true,
				nice: true,
				label: "Sessions & Time"
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
						filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
					},
					title: (d: PlotData) => `${d.day}: ${d.sessions} Sessions`
				}),
				Plot.lineY(plotData, {
					x: "day",
					y: (d: PlotData) => (d.time),
					curve: "natural",
					stroke: colors.blue[6],
					strokeWidth: 3,
					marker: "dot",
					// title: d => `${d.day}: ${d.time} min`
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
