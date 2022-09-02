import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FaLightbulb, FaMugHot } from "react-icons/fa";
import { helps } from "./helps.data";

const Helps = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: "helps",
  });
  return (
    <>
      <Button leftIcon={<Icon as={FaLightbulb} />} onClick={onOpen}>
        Helps
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Heading>Helps</Heading>
          </DrawerHeader>
          <DrawerBody>
            <Container>
              <Heading as="h3" size="lg">
                Breaks Ideas
              </Heading>
              <List spacing="3" marginY="3">
                {helps.breaks.map((breakTips) => (
                  <ListItem key={breakTips}>
                    <ListIcon as={FaMugHot} />
                    {breakTips}
                  </ListItem>
                ))}
              </List>
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Helps;
