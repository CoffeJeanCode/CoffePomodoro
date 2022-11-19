import { Button, Container, Drawer, Title } from "@mantine/core";
import { Chart, registerables } from "chart.js";
import { keys, pluck, props, reduce } from "ramda";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FaChartBar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { currentDate, stats } from "../../state";
import { DAYS } from "../../state/constants";

Chart.register(...registerables);

const Stats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [statitics, setStatitics] = useRecoilState(stats);
  const [date, setDate] = useRecoilState(currentDate);

  useEffect(() => {
    const defaultStats =
      keys(statitics).length === 0 || new Date().getDay() === 1
        ? reduce(
            (acc: any, value: any) => {
              const key = keys(value)[0];
              acc[key] = value[key];
              return acc;
            },
            {},
            DAYS.map((day) => ({ [day]: { sessions: 0 } }))
          )
        : statitics;
    setStatitics(defaultStats);
  }, []);

  return (
    <>
      <Button leftIcon={<FaChartBar />} onClick={() => setIsOpen(true)}>
        Stats
      </Button>
      <Drawer
        opened={isOpen}
        position="bottom"
        onClose={() => setIsOpen(false)}
      >
        <Container>
          <Title order={2} size={35}>
            Stats
          </Title>
          <Line
            height={60}
            options={{
              normalized: true,
              scales: {
                y: {
                  min: 0,
                  max: 25,
                },
              },
            }}
            data={{
              labels: DAYS,

              datasets: [
                {
                  label: "N° Sessions",
                  data: pluck<any>("sessions")(props(DAYS)<any>(statitics)),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                  ],
                  borderWidth: 1,
                  fill: true,
                  tension: 0.4,
                },
              ],
            }}
          />
        </Container>
      </Drawer>
    </>
  );
};

export default Stats;
