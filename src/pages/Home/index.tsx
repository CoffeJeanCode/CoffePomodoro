import Helps from "@/components/Helps";
import Settings from "@/components/Settings";
import Stats from "@/components/Stats";
import Timer from "@/components/Timer";
import { useInfoState } from "@/stores";
import { useStatsState } from "@/stores/states/stats";
import { getEndOfWeek, isToday } from "@/utils/time.util";
import { Center, Container, Group, Title } from "@mantine/core";
import { useLayoutEffect } from "react";

const Home = () => {
  const { date, endWeek, setEndWeek, resetInfo } = useInfoState();
  const resetStats = useStatsState((stats) => stats.resetStats);

  useLayoutEffect(() => {
    const currentDate = new Date();
    const today = new Date(date.raw);

    if (!isToday(today)) resetInfo();
    if (currentDate > new Date(endWeek)) {
      resetStats();

      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setEndWeek(getEndOfWeek(nextWeek, 1));
    }
  }, [date, resetInfo, resetStats]);

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
