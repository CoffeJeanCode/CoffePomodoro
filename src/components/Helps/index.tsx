import { Button, Container, Drawer, List, Title } from "@mantine/core";
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
          <Title>Helps</Title>
          <Title order={3} size="lg">
            Breaks Ideas
          </Title>
          <List spacing={10} my={3}>
            {helps.breaks.map((breakTips) => (
              <List.Item key={breakTips} icon={<FaMugHot />}>
                {breakTips}
              </List.Item>
            ))}
          </List>
        </Container>
      </Drawer>
    </>
  );
};

export default Helps;
