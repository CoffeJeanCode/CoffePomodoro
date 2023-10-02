import { Mode } from "@/models";
import { useInfoState } from "@/stores";
import { Badge } from "@mantine/core";
import { FC, memo } from "react";

const TimerMode: FC = () => {
  const mode = useInfoState((info) => info.mode);

  return (
    <Badge
      size="lg"
      style={(theme) => ({
        background:
          mode === Mode.Pomodoro ? theme.colors.red[5] : theme.colors.green[5],
        color: theme.colors.gray[0],
        userSelect: "none",
      })}
    >
      {mode.toLocaleUpperCase()}
    </Badge>
  );
};

export default memo(TimerMode);
