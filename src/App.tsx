import {
  Box,
  Center,
  ChakraProvider,
  Container,
  Heading,
} from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Helps from "./components/Helps";
import Settings from "./components/Settings";
import Tasks from "./components/Tasks";
import Timer from "./components/Timer";

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Container maxWidth="5xl">
          <Center
            height="100vh"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Box width="xl">
              <Center justifyContent="space-evenly" width="full">
                <Heading as="h1">Coffe Pomodoro</Heading>
                <Settings />
                <Helps />
              </Center>
            </Box>
            <Timer />
            <Tasks />
          </Center>
        </Container>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
