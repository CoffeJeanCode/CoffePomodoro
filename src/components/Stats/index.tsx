import { StatType } from "@/models/stats";
import { useStatsState } from "@/stores/states/stats";
import { secondsToMinutes } from "@/utils/time.util";
import {
  Button,
  Container,
  Drawer,
  Flex,
  SegmentedControl,
  Title,
} from "@mantine/core";
import { Chart, registerables } from "chart.js";
import { keys, map } from "ramda";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { FaChartBar } from "react-icons/fa";

Chart.register(...registerables);

const chartCommons = { borderWidth: 1, fill: true, tension: 0.4 };

const Stats = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { stats, prevWeekStats } = useStatsState();
  const [statType, setStatType] = useState(StatType.Sessions);

  const labels = keys(stats);
  const data = map((weekday) => stats[weekday][statType], labels);
  const prevWeekData = map(
    (weekday) => prevWeekStats[weekday][statType],
    labels
  );

  const label = statType === StatType.Sessions ? "# Sessions" : "# Minutes";

  return (
    <>
      <Button leftSection={<FaChartBar />} onClick={() => setIsOpen(true)}>
        Week Stats
      </Button>
      <Drawer
        opened={isOpen}
        position="bottom"
        size={400}
        onClose={() => setIsOpen(false)}
      >
        <Container h="100%">
          <Flex justify="center" align="center" gap="md">
            <Title order={2} size={35}>
              Stats
            </Title>
          </Flex>
          <SegmentedControl
            my={10}
            data={[
              { label: "Sessions", value: StatType.Sessions },
              { label: "Time", value: StatType.Time },
            ]}
            value={statType}
            onChange={(value: string) => setStatType(value as StatType)}
          />
          <Line
            height={70}
            options={{
              normalized: true,
              scales: {
                y: {
                  min: 0,
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
                  borderColor: "rgb(255, 99, 132)",
                  ...chartCommons,
                },
                {
                  label: `Prev. Week ${label}`,
                  data:
                    statType === StatType.Sessions
                      ? prevWeekData
                      : prevWeekData.map(secondsToMinutes),
                  borderColor: "rgb(153, 102, 255)",
                  borderDash: [8, 4],
                  ...chartCommons,
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
