import { Box, Slider, SliderProps, Title } from "@mantine/core";
import { FC, memo } from "react";

interface SliderSettingsProps extends SliderProps {
  title: string;
}

export const SliderSettings: FC<SliderSettingsProps> = memo(
  ({ title, marks, min, max, defaultValue, onChange }) => {
    return (
      <Box my={10}>
        <Title order={4}>{title}</Title>
        <Slider
          min={min}
          max={max}
          label={(value) => `${value} mins`}
          marks={marks}
          defaultValue={defaultValue}
          sx={{ width: "20rem" }}
          onChangeEnd={onChange}
        />
      </Box>
    );
  }
);
