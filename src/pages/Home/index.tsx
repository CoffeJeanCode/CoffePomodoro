import { Center, Container, Group, Title } from "@mantine/core";
import Helps from "../../components/Helps";
import Settings from "../../components/Settings";
import Stats from "../../components/Stats";
import Tasks from "../../components/Tasks";
import Timer from "../../components/Timer";

const Home = () => {
  return (
    <Container>
      <Center sx={{ flexDirection: "column" }}>
        <Title order={1} color="white" my={10}>
          Coffe Pomodoro
        </Title>
        <Group mb={20}>
          <Settings />
          <Stats />
          <Helps />
        </Group>
        <Timer />
        <Tasks />
      </Center>
    </Container>
  );
};

export default Home;
