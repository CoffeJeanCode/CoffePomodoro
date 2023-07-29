import Helps from "@/components/Helps";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import { useInfoState } from "@/stores";
import { isToday } from "@/utils/time.util";
import { Center, Container, Group, Title } from "@mantine/core";
import { useEffect } from "react";

const Home = () => {
  const { date, resetInfo } = useInfoState();

  useEffect(() => {
    if (!isToday(date)) resetInfo();
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
      </Center>
    </Container>
  );
};

export default Home;
