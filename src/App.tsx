import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Heading,
  Input,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import Settings from "./components/Settings";
import Timer from "./components/Timer";

type Mode = "work" | "break" | "long break";

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Container maxWidth="full">
          <Box>
            <Center justifyContent={"space-evenly"}>
              <Heading as="h1">Coffe Pomodoro</Heading>
              <Settings />
            </Center>
          </Box>
          <Timer />
        </Container>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
