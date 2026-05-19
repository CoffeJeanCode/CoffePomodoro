import { Suspense, lazy, useLayoutEffect } from "react";

import { useInfoState, useTimerState } from "@/stores";
import { useBrainDumpState } from "@/stores/states/brainDump";
import { useStatsState } from "@/stores/states/stats";
import { getEndOfWeek, isToday } from "@/utils/time.util";
import ui from "@/styles/ui.module.css";
import { Center, Container, Flex, Loader, Stack, Title } from "@mantine/core";

const Helps = lazy(() => import("@/components/Helps"));
const QuickMenu = lazy(() => import("@/components/QuickMenu"));
const BrainDump = lazy(() => import("@/components/BrainDump"));
const Settings = lazy(() => import("@/components/Settings"));
const Stats = lazy(() => import("@/components/Stats"));
const Timer = lazy(() => import("@/components/Timer"));

const Home = () => {
	const { date, endWeek, setEndWeek, resetInfo } = useInfoState();
	const resetStats = useStatsState((stats) => stats.resetStats);
	const resetTimer = useTimerState((state) => state.resetTimer);
	const autoPurgeBrainDump = useBrainDumpState((s) => s.autoPurge);

	useLayoutEffect(() => {
		const todayDate = new Date(date.raw);
		const endWeekDate = new Date(endWeek);

		if (!isToday(todayDate)) {
			resetTimer();
			resetInfo();
			autoPurgeBrainDump();
		}
		if (todayDate.getTime() > endWeekDate.getTime()) {
			resetStats();

			const expireDate = new Date().setDate(new Date().getDate() + 8);
			setEndWeek(getEndOfWeek(new Date(expireDate), 1));
		}
	}, [date, endWeek, resetTimer, resetInfo, resetStats, setEndWeek, autoPurgeBrainDump]);

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
		</Suspense>
	);
};

export default Home;
