import Helps from "@/components/Helps";
import Settings from "@/components/Settings";
import Stats from "@/components/Stats";
import Timer from "@/components/Timer";
import { useInfoState } from "@/stores";
import { useStatsState } from "@/stores/states/stats";
import { isToday } from "@/utils/time.util";
import { Center, Container, Group, Title } from "@mantine/core";
import { useLayoutEffect } from "react";

const Home = () => {
  const { date, endWeek, setEndWeek, resetInfo } = useInfoState();
  const resetStats = useStatsState((stats) => stats.resetStats);

  useLayoutEffect(() => {
    const todayDate = new Date(date.raw);
    const endWeekDate = new Date(endWeek);

    if (!isToday(todayDate)) resetInfo();
    if (todayDate > endWeekDate) {
      resetStats();

      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 8);
      setEndWeek(nextWeek);
    }
  }, [date, resetInfo, resetStats]);

  return (
    <Container>
      <Center style={{ flexDirection: "column" }}>
        <Title order={1} c="white" my={10}>
          Gabriel Y Jesus Pomodoro
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
