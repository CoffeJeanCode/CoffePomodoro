import type { Mode } from "@/models/info";
import { ActionIcon, Badge, Box, Group } from "@mantine/core";
import { type FC, memo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getColorMode } from "./utils/timer";

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
	const stepLabel =
		sessionAdjustStepMinutes === 1
			? "1 minute"
			: `${sessionAdjustStepMinutes} minutes`;

	return (
		<Group
			justify="space-between"
			align="center"
			wrap="nowrap"
			w="100%"
			gap="xs"
			px={4}
			style={{ maxWidth: "100%" }}
		>
			<Box
				style={{
					width: 36,
					display: "flex",
					justifyContent: "flex-start",
					flexShrink: 0,
				}}
			>
				<ActionIcon
					size="sm"
					variant="transparent"
					color="gray.0"
					title={`Subtract ${stepLabel} (−)`}
					onClick={onSubtractMinute}
					aria-label={`Subtract ${stepLabel} from this session`}
					style={{ opacity: 0.55 }}
				>
					<FaMinus size={12} />
				</ActionIcon>
			</Box>

			<Badge
				size="lg"
				style={(theme) => ({
					background: theme.colors[base][5],
					color: theme.colors.gray[0],
					userSelect: "none",
					flexShrink: 0,
				})}
			>
				{mode.toLocaleUpperCase()}
			</Badge>

			<Box
				style={{
					width: 36,
					display: "flex",
					justifyContent: "flex-end",
					flexShrink: 0,
				}}
			>
				<ActionIcon
					size="sm"
					variant="transparent"
					color="gray.0"
					title={`Add ${stepLabel} (+)`}
					onClick={onAddMinute}
					aria-label={`Add ${stepLabel} to this session`}
					style={{ opacity: 0.55 }}
				>
					<FaPlus size={12} />
				</ActionIcon>
			</Box>
		</Group>
	);
};

export default memo(TimerHeader);
