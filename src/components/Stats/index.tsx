import { StatType } from "@/models/stats";
import { useStatsState } from "@/stores/states/stats";
import { secondsToMinutes } from "@/utils/time.util";
import {
  Badge,
  Button,
  Container,
  Drawer,
  Flex,
  SegmentedControl,
  Title,
  Tooltip,
} from "@mantine/core";
import { Chart, registerables } from "chart.js";
import { keys, map, max, reduce } from "ramda";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { FaChartBar } from "react-icons/fa";

Chart.register(...registerables);

const Stats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { stats, prevWeekStats, productivityStat } = useStatsState();
  const [statType, setStatType] = useState(StatType.Sessions);

  const labels = keys(stats);
  const data = map((weekday) => stats[weekday][statType], labels);
  const label = statType === StatType.Sessions ? "N° Sessions" : "# Minutes";
  const maxValue = Number(reduce(max, 0, data));

  return (
    <>
      <Button leftIcon={<FaChartBar />} onClick={() => setIsOpen(true)}>
        Week Stats
      </Button>
      <Drawer
        opened={isOpen}
        position="bottom"
        size={400}
        onClose={() => setIsOpen(false)}
      >
        <Container>
          <Flex justify="center" align="center" gap="md">
            <Title order={2} size={35}>
              Stats
            </Title>
            <Tooltip
              label="Productivity"
              color="blue"
              position="bottom"
              withArrow
              arrowPosition="center"
            >
              <Badge variant="outline" size="lg" mt={3}>
                {productivityStat.toFixed(1)}%
              </Badge>
            </Tooltip>
          </Flex>
          <SegmentedControl
            my={10}
            data={[
              { label: "Sessions", value: StatType.Sessions },
              { label: "Time", value: StatType.Time },
            ]}
            value={statType}
            onChange={(value: StatType) => setStatType(value)}
          />
          <Line
            height={60}
            options={{
              normalized: true,
              scales: {
                y: {
                  min: 0,
                  max: maxValue,
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  label,
                  data:
                    statType === StatType.Sessions
                      ? data
                      : data.map(secondsToMinutes),
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
