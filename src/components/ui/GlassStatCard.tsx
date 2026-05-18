import ui from "@/styles/ui.module.css";
import { Box, Flex, Text } from "@mantine/core";
import type { FC, ReactNode } from "react";

interface GlassStatCardProps {
	icon?: ReactNode;
	label: string;
	value: string;
	hint?: string;
	valueColor?: string;
}

export const GlassStatCard: FC<GlassStatCardProps> = ({
	icon,
	label,
	value,
	hint,
	valueColor,
}) => (
	<Box className={ui.statCard} h="100%">
		<Flex direction="column" align="center" gap={4} py="xs">
			{icon}
			<Text size="xs" c="dimmed" ta="center">
				{label}
			</Text>
			<Text size="xl" fw={700} ta="center" c={valueColor}>
				{value}
			</Text>
			{hint ? (
				<Text size="xs" c="dimmed" ta="center">
					{hint}
				</Text>
			) : null}
		</Flex>
	</Box>
);
