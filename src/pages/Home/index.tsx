import Helps from "@/components/Helps";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import { FavIcon, Mode } from "@/models";
import { useInfoState } from "@/stores";
import { getDate, isToday } from "@/utils/time.util";
import { Center, Container, Group, Title } from "@mantine/core";
import { useEffect } from "react";

const Home = () => {
	const { date, setInfo } = useInfoState();

	useEffect(() => {
		if (!isToday(date)) {
			setInfo({
				date: getDate(new Date()),
				mode: Mode.Pomodoro,
				sessions: 1,
				pomodoros: 1,
				favIcon: FavIcon.work,
			});
		}
	}, []);

	return (
		<Container>
			<Center sx={{ flexDirection: "column" }}>
				<Title order={1} color="white" my={10}>
					CoffePomodoro
				</Title>
				<Group mb={20}>
					<Settings />
					{/* <Stats /> */}
					<Helps />
				</Group>
				<Timer />
				{/* <Tasks /> */}
			</Center>
		</Container>
	);
};

export default Home;
