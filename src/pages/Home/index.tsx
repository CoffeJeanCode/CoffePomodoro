import { Suspense, lazy, useLayoutEffect } from "react";

import { useInfoState, useShutdownState, useTimerState } from "@/stores";
import { useBrainDumpState } from "@/stores/states/brainDump";
import { useStatsState } from "@/stores/states/stats";
import ui from "@/styles/ui.module.css";
import { getDate, getEndOfWeek, isToday } from "@/utils/time.util";
import { Center, Container, Flex, Loader, Stack, Title } from "@mantine/core";

const Helps = lazy(() => import("@/components/Helps"));
const QuickMenu = lazy(() => import("@/components/QuickMenu"));
const BrainDump = lazy(() => import("@/components/BrainDump"));
const Settings = lazy(() => import("@/components/Settings"));
const Stats = lazy(() => import("@/components/Stats"));
const Shutdown = lazy(() => import("@/components/Shutdown"));
const Timer = lazy(() => import("@/components/Timer"));

const Home = () => {
	const { date, endWeek, setEndWeek, resetInfo } = useInfoState();
	const resetStats = useStatsState((stats) => stats.resetStats);
	const resetTimer = useTimerState((state) => state.resetTimer);
	const autoPurgeBrainDump = useBrainDumpState((s) => s.autoPurge);
	const isShutDown = useShutdownState((s) => s.isShutDown);
	const shutDownDate = useShutdownState((s) => s.shutDownDate);
	const clearShutdown = useShutdownState((s) => s.clearShutdown);

	useLayoutEffect(() => {
		const todayDate = new Date(date.raw);
		const endWeekDate = new Date(endWeek);

		if (!isToday(todayDate)) {
			resetTimer();
			resetInfo();
			autoPurgeBrainDump();
		}
		// Lift the shutdown lock once a new day begins.
		if (isShutDown && shutDownDate !== getDate(new Date())) {
			clearShutdown();
		}
		if (todayDate.getTime() > endWeekDate.getTime()) {
			resetStats();

			const expireDate = new Date().setDate(new Date().getDate() + 8);
			setEndWeek(getEndOfWeek(new Date(expireDate), 1));
		}
	}, [
		date,
		endWeek,
		resetTimer,
		resetInfo,
		resetStats,
		setEndWeek,
		autoPurgeBrainDump,
		isShutDown,
		shutDownDate,
		clearShutdown,
	]);

	return (
		<Suspense
			fallback={
				<Center h="100vh">
					<Loader color="red" size="xl" />
				</Center>
			}
		>
			<Container h="100vh" size="sm" style={{ overflow: "hidden" }}>
				<Center h="100%">
					<Stack align="center" gap="lg" w="100%">
						<Title order={1} size={42} className={ui.pageTitle}>
							Coffe Pomodoro
						</Title>
						<Flex gap="sm" wrap="wrap" justify="center">
							<Settings />
							<Stats />
							<Helps />
						</Flex>
						<Timer />
					</Stack>
				</Center>
			</Container>
			<QuickMenu />
			<BrainDump />
			<Shutdown />
		</Suspense>
	);
};

export default Home;
