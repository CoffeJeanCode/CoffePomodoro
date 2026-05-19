import { Box, Slider, type SliderProps, Title } from "@mantine/core";
import { type FC, memo } from "react";

interface SliderSettingsProps extends SliderProps {
	title: string;
}

export const SliderSettings: FC<SliderSettingsProps> = memo(
	({ title, marks, min, max, value, onChange }) => {
		return (
			<Box my={10}>
				<Title order={4}>{title}</Title>
				<Slider
					min={min}
					max={max}
					label={(value) => `${value} mins`}
					marks={marks}
					value={value}
					style={{ width: "20rem" }}
					onChange={onChange}
				/>
			</Box>
		);
	},
);
