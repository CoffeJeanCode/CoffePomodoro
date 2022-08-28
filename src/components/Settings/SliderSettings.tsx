import {
  Box,
  Heading,
  Slider,
  SliderProps,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";
import { FC, memo, ReactElement, useCallback, useState } from "react";

interface SliderSettingsProps extends SliderProps {
  title: string;
  children: ReactElement[];
}

export const SliderSettings: FC<SliderSettingsProps> = memo(
  ({ title, children, min, max, defaultValue, onChange }) => {
    const [sliderValue, setSliderValue] = useState(defaultValue);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleOnChange = useCallback(
      (value: number) => {
        setSliderValue(value);
        if (onChange) onChange(value);
      },
      [sliderValue]
    );

    return (
      <Box marginY="4">
        <Heading as="h4" size="sm">
          {title}
        </Heading>
        <Slider
          id="slider"
          defaultValue={sliderValue}
          min={min}
          max={max}
          colorScheme="red"
          onChange={handleOnChange}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {children}
          <Tooltip
            hasArrow
            bg="red.400"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${sliderValue} Minutes`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Box>
    );
  }
);
