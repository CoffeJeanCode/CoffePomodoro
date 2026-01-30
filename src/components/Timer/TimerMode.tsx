import { useInfoState } from "@/stores";
import { Badge } from "@mantine/core";
import { type FC, memo } from "react";
import { getColorMode } from "./utils/timer";

const TimerMode: FC = () => {
	const mode = useInfoState((info) => info.mode);
	const base = getColorMode(mode);

	return (
		<Badge
			size="lg"
			style={(theme) => ({
				background: theme.colors[base][5],
				color: theme.colors.gray[0],
				userSelect: "none",
			})}
		>
			{mode.toLocaleUpperCase()}
		</Badge>
	);
};

export default memo(TimerMode);
