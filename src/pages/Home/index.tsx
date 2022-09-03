import { Box, ButtonGroup, Center, Container, Heading } from "@chakra-ui/react";
import Helps from "../../components/Helps";
import Settings from "../../components/Settings";
import Stats from "../../components/Stats";
import Tasks from "../../components/Tasks";
import Timer from "../../components/Timer";

const Home = () => {
  return (
    <Container maxWidth="5xl">
      <Center
        height="100vh"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <Box>
          <Center>
            <Heading as="h1">Coffe Pomodoro</Heading>
          </Center>
          <Center justifyContent="space-evenly" width="full">
            <ButtonGroup>
              <Settings />
              <Helps />
              <Stats />
            </ButtonGroup>
          </Center>
        </Box>
        <Timer />
        <Tasks />
      </Center>
    </Container>
  );
};

export default Home;
