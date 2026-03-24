import { Title, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type FC, memo } from "react";

interface TimerTextProps {
	remainingTimeText: string;
	sessionProgressPercent: number;
}

const TimerText: FC<TimerTextProps> = ({
	remainingTimeText,
	sessionProgressPercent,
}) => {
	const isMobile = useMediaQuery("(max-width: 30rem)");
	return (
		<Tooltip
			label={`Session progress: ${sessionProgressPercent}%`}
			position="bottom"
			withArrow
			openDelay={400}
		>
			<span
				style={{
					display: "inline-block",
					cursor: "default",
					lineHeight: 1,
				}}
			>
				<Title
					order={3}
					fz={isMobile ? 85 : 160}
					style={{ userSelect: "none" }}
					c="white"
				>
					{remainingTimeText}
				</Title>
			</span>
		</Tooltip>
	);
};

export default memo(TimerText);
