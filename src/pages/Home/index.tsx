import Helps from "@/components/Helps";
import Info from "@/components/Info";
import QuickMenu from "@/components/QuickMenu";
import Settings from "@/components/Settings";
import Stats from "@/components/Stats";
import Timer from "@/components/Timer";
import { useInfoState, useTimerState } from "@/stores";
import { useStatsState } from "@/stores/states/stats";
import { getEndOfWeek, isToday } from "@/utils/time.util";
import { Center, Container, Flex, Title } from "@mantine/core";
import { useLayoutEffect } from "react";

const Home = () => {
	const { date, endWeek, setEndWeek, resetInfo } = useInfoState();
	const resetStats = useStatsState((stats) => stats.resetStats);
	const resetTimer = useTimerState((state) => state.resetTimer);

	useLayoutEffect(() => {
		const todayDate = new Date(date.raw);
		const endWeekDate = new Date(endWeek);
		console.log(
			todayDate.getTime() > endWeekDate.getTime(),
			todayDate,
			endWeekDate,
		);
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
		<>
			<Container mah={"100vh"} style={{ overflow: "hidden" }}>
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
		</>
	);
};

export default Home;
