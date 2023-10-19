import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Button, Container, Image, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";
import { infoData } from "./info.data";

const TRANSITION_DURATION = 200;

const Info = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <>
      <Modal.Root
        size={"lg"}
        opened={opened}
        onClose={close}
        transitionProps={{ duration: TRANSITION_DURATION }}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title mx={"auto"}>
              <Title order={3}>Why use pomodoro tecnique?</Title>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Carousel
              height={450}
              getEmblaApi={setEmbla}
              slideSize="100%"
              align="center"
              controlsOffset="xs"
              loop
            >
              {infoData.map((data) => (
                <Carousel.Slide key={data.title}>
                  <Container
                    px={60}
                    h="100%"
                    display="grid"
                    style={{ placeItems: "center" }}
                  >
                    <Title order={4} size={26}>
                      {data.title}
                    </Title>
                    <Image
                      radius="sm"
                      miw="100%"
                      src={`/img/info/${data.image.src}`}
                      alt={data.image.alt}
                    />
                    <Text>{data.description}</Text>
                  </Container>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Button
        style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
        radius={"xl"}
        onClick={open}
      >
        <FaInfo />
      </Button>
    </>
  );
};

export default Info;
