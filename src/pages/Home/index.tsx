import { useLayoutEffect, lazy, Suspense } from "react";

import { useInfoState, useTimerState } from "@/stores";
import { useStatsState } from "@/stores/states/stats";
import { getEndOfWeek, isToday } from "@/utils/time.util";
import { Center, Container, Flex, Loader, Title } from "@mantine/core";

const Helps = lazy(() => import("@/components/Helps"));
const Info = lazy(() => import("@/components/Info"));
const QuickMenu = lazy(() => import("@/components/QuickMenu"));
const Settings = lazy(() => import("@/components/Settings"));
const Stats = lazy(() => import("@/components/Stats"));
const Timer = lazy(() => import("@/components/Timer"));

const Home = () => {
	const { date, endWeek, setEndWeek, resetInfo } = useInfoState();
	const resetStats = useStatsState((stats) => stats.resetStats);
	const resetTimer = useTimerState((state) => state.resetTimer);

	useLayoutEffect(() => {
		const todayDate = new Date(date.raw);
		const endWeekDate = new Date(endWeek);

		if (!isToday(todayDate)) {
			resetTimer();
			resetInfo();
		}
		if (todayDate.getTime() > endWeekDate.getTime()) {
			resetStats();

			const expireDate = new Date().setDate(new Date().getDate() + 8);
			setEndWeek(getEndOfWeek(new Date(expireDate), 1));
		}
	}, [date, resetInfo, resetStats]);

	return (
		<Suspense
			fallback={
				<Center h="100vh">
					<Loader color="red" size="xl" />
				</Center>
			}>
			<Container h="100vh" style={{ overflow: "hidden" }}>
				<Center
					style={{
						flexDirection: "column",
					}}
				>
					<Title order={1} c="white" my={10} size={46}>
						Coffe Pomodoro
					</Title>
					<Flex mt={10} mb={40} gap={15}>
						<Settings />
						<Stats />
						<Helps />
					</Flex>
					<Timer />
				</Center>
				<Info />
			</Container>
			<QuickMenu />
		</Suspense>
	);
};

export default Home;
