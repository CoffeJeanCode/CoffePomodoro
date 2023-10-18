import { useTimerState } from "@/stores";
import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, memo } from "react";

const TimerText: FC = () => {
  const timerText = useTimerState((timer) => timer.remainingTimeText);
  const isMobile = useMediaQuery("(max-width: 30rem)");
  return (
    <Title
      order={3}
      fz={isMobile ? 85 : 160}
      style={{ userSelect: "none" }}
      c="white"
    >
      {timerText}
    </Title>
  );
};

export default memo(TimerText);
