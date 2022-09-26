import { Button, Container, Drawer, Kbd, List, Title } from "@mantine/core";
import { useState } from "react";
import { FaLightbulb, FaMugHot } from "react-icons/fa";
import { helps } from "./helps.data";

const Helps = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button leftIcon={<FaLightbulb />} onClick={() => setIsOpen(true)}>
        Helps
      </Button>
      <Drawer opened={isOpen} position="right" onClose={() => setIsOpen(false)}>
        <Container>
          <Title order={2}>Helps</Title>
          <Title order={3} size={20}>
            Breaks Ideas
          </Title>
          <List spacing={10} my={3}>
            {helps.breaks.map((breakTips) => (
              <List.Item key={breakTips} icon={<FaMugHot />}>
                {breakTips}
              </List.Item>
            ))}
          </List>

          <Title order={3} size={20}>
            Hotkeys
          </Title>
          <Title order={4}>Main</Title>
          <List spacing={10}>
            {helps.hotkeys.main.map((hotkey) => (
              <List.Item key={hotkey.key} my={10}>
                <Kbd mr={10}>{hotkey.key}</Kbd>
                {hotkey.action}
              </List.Item>
            ))}
          </List>
          <Title order={4}>Widget</Title>
          <List spacing={10}>
            {helps.hotkeys.widget.map((hotkey) => (
              <List.Item key={hotkey.key} my={10}>
                <Kbd mr={10}>{hotkey.key}</Kbd>
                {hotkey.action}
              </List.Item>
            ))}
          </List>
        </Container>
      </Drawer>
    </>
  );
};

export default Helps;
