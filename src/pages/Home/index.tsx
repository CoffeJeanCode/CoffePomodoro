import Helps from "@/components/Helps";
import Settings from "@/components/Settings";
import Stats from "@/components/Stats";
import Timer from "@/components/Timer";
import { useInfoState } from "@/stores";
import { useStatsState } from "@/stores/states/stats";
import { getEndOfWeek, isToday } from "@/utils/time.util";
import { Center, Container, Group, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useLayoutEffect } from "react";

const Home = () => {
  const { date, resetInfo } = useInfoState();
  const resetStats = useStatsState((stats) => stats.resetStats);
  const [endOfWeek, setEndOfWeek] = useLocalStorage({
    key: "end",
    defaultValue: getEndOfWeek(new Date(), 1),
    getInitialValueInEffect: true,
  });

  useLayoutEffect(() => {
    const today = new Date(date.raw);
    const endOfWeekValue: Date = getEndOfWeek(today, 1);

    if (!isToday(today)) resetInfo();
    if (today > new Date(endOfWeek)) {
      resetStats();
      setEndOfWeek(endOfWeekValue);
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
          <Stats />
          <Helps />
        </Group>
        <Timer />
      </Center>
    </Container>
  );
};

export default Home;
