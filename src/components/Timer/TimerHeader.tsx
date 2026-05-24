import type { Mode } from "@/models/info";
import ui from "@/styles/ui.module.css";
import { getModeTitle } from "@/utils/modeLabels";
import { Box, Group, Text } from "@mantine/core";
import { type FC, memo } from "react";
import { getModeHexColors } from "./utils/timer";

interface TimerHeaderProps {
	mode: Mode;
}

const TimerHeader: FC<TimerHeaderProps> = ({ mode }) => {
	const { btnMain } = getModeHexColors(mode);

	return (
		<Group justify="center" align="center" wrap="nowrap" w="100%" gap="xs">
			<Box className={ui.glassInset} px="md" py={6}>
				<Text size="sm" fw={600} style={{ color: btnMain }}>
					{getModeTitle(mode)}
				</Text>
			</Box>
		</Group>
	);
};

export default memo(TimerHeader);
