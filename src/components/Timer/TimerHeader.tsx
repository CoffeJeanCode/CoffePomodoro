import type { Mode } from "@/models/info";
import ui from "@/styles/ui.module.css";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { type FC, memo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getModeTitle } from "@/utils/modeLabels";
import { getColorMode, getModeHexColors } from "./utils/timer";

interface TimerHeaderProps {
	mode: Mode;
	sessionAdjustStepMinutes: number;
	onAddMinute: () => void;
	onSubtractMinute: () => void;
}

const TimerHeader: FC<TimerHeaderProps> = ({
	mode,
	sessionAdjustStepMinutes,
	onAddMinute,
	onSubtractMinute,
}) => {
	const base = getColorMode(mode);
	const { btnMain } = getModeHexColors(mode);
	const stepLabel =
		sessionAdjustStepMinutes === 1
			? "1 minute"
			: `${sessionAdjustStepMinutes} minutes`;

	return (
		<Group justify="space-between" align="center" wrap="nowrap" w="100%" gap="xs">
			<ActionIcon
				size="md"
				variant="light"
				color="gray"
				title={`Subtract ${stepLabel} (−)`}
				onClick={onSubtractMinute}
				aria-label={`Subtract ${stepLabel}`}
			>
				<FaMinus size={12} />
			</ActionIcon>

			<Box className={ui.glassInset} px="md" py={6}>
				<Text size="sm" fw={600} style={{ color: btnMain }}>
					{getModeTitle(mode)}
				</Text>
			</Box>

			<ActionIcon
				size="md"
				variant="light"
				color={base}
				title={`Add ${stepLabel} (+)`}
				onClick={onAddMinute}
				aria-label={`Add ${stepLabel}`}
			>
				<FaPlus size={12} />
			</ActionIcon>
		</Group>
	);
};

export default memo(TimerHeader);
