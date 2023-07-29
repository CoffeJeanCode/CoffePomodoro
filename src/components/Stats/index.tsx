import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Stats = () => {
	// const [isOpen, setIsOpen] = useState(false);
	// const [statitics, setStatitics] = useRecoilState(stats);
	// const [statType, setStatType] = useState(SESSIONS_STAT);
	// const [currentWeek, setCurrentWeek] = useLocalStorage({
	// 	key: "currentWeek",
	// 	defaultValue: getCurrentWeek(new Date()),
	// });

	// useEffect(() => {
	// 	const defaultStats =
	// 		keys(statitics).length === 0 || getCurrentWeek(new Date()) !== currentWeek
	// 			? reduce(
	// 					(acc: any, value: any) => {
	// 						const key = keys(value)[0];
	// 						acc[key] = value[key];
	// 						return acc;
	// 					},
	// 					{},
	// 					DAYS.map((day) => ({
	// 						[day]: { [SESSIONS_STAT]: 0, [TIME_STAT]: 0 },
	// 					})),
	// 			  )
	// 			: statitics;
	// 	setCurrentWeek(getCurrentWeek(new Date()));
	// 	setStatitics(defaultStats);
	// }, []);

	return (
		<>
			{/* <Button leftIcon={<FaChartBar />} onClick={() => setIsOpen(true)}>
        Week Stats
      </Button> */}
			{/* <Drawer opened={isOpen} position="bottom" size={400} onClose={() => setIsOpen(false)}>
				<Container>
					<Title order={2} size={35}>
						Stats
					</Title>
					<SegmentedControl
						my={10}
						data={[
							{ label: "Sessions", value: SESSIONS_STAT },
							{ label: "Time", value: TIME_STAT },
						]}
						value={statType}
						onChange={setStatType}
					/>
					<Line
						height={60}
						options={{
							normalized: true,
							scales: {
								y: {
									min: 0,
									max: statType === SESSIONS_STAT ? 25 : 500,
								},
							},
						}}
						data={{
							labels: DAYS,
							datasets: [
								{
									label: statType === SESSIONS_STAT ? "N° Sessions" : "# Minutes",
									data:
										statType === SESSIONS_STAT
											? pluck<any>(SESSIONS_STAT)(props(DAYS)<any>(statitics))
											: map(secondsToMinutes)(pluck<any>(TIME_STAT)(props(DAYS)<any>(statitics))),
									backgroundColor: [
										"rgba(255, 99, 132, 0.2)",
										"rgba(255, 159, 64, 0.2)",
										"rgba(255, 205, 86, 0.2)",
										"rgba(75, 192, 192, 0.2)",
										"rgba(54, 162, 235, 0.2)",
										"rgba(153, 102, 255, 0.2)",
										"rgba(201, 203, 207, 0.2)",
									],
									borderColor: [
										"rgb(255, 99, 132)",
										"rgb(255, 159, 64)",
										"rgb(255, 205, 86)",
										"rgb(75, 192, 192)",
										"rgb(54, 162, 235)",
										"rgb(153, 102, 255)",
										"rgb(201, 203, 207)",
									],
									borderWidth: 1,
									fill: true,
									tension: 0.4,
								},
							],
						}}
					/>
				</Container>
			</Drawer> */}
		</>
	);
};

export default Stats;
