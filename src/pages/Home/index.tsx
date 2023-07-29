import Helps from "@/components/Helps";
import Settings from "@/components/Settings";
import Stats from "@/components/Stats";
import Timer from "@/components/Timer";
import { useInfoState } from "@/stores";
import { useStatsState } from "@/stores/states/stats";
import { getCurrentWeek, isToday } from "@/utils/time.util";
import { Center, Container, Group, Title } from "@mantine/core";
import { useEffect } from "react";

const Home = () => {
  const { date, week, resetInfo } = useInfoState();
  const resetStats = useStatsState((stats) => stats.resetStats);

  useEffect(() => {
    if (!isToday(date)) resetInfo();
    if (week !== getCurrentWeek(new Date())) resetStats();
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
