import ui from "@/styles/ui.module.css";
import { Box, Text } from "@mantine/core";
import { type FC, memo, useCallback, useEffect, useState } from "react";

const TIP_TRANSITION_MS = 420;
const DEFAULT_INTERVAL_MS = 6000;

function pickNextIndex(length: number, current: number): number {
	if (length <= 1) return 0;
	let next = current;
	while (next === current) {
		next = Math.floor(Math.random() * length);
	}
	return next;
}

interface RotatingTipProps {
	tips: readonly string[];
	intervalMs?: number;
}

const RotatingTip: FC<RotatingTipProps> = ({
	tips,
	intervalMs = DEFAULT_INTERVAL_MS,
}) => {
	const [index, setIndex] = useState(() =>
		Math.floor(Math.random() * tips.length),
	);
	const [visible, setVisible] = useState(true);

	const cycleTip = useCallback(() => {
		setVisible(false);
		window.setTimeout(() => {
			setIndex((prev) => pickNextIndex(tips.length, prev));
			setVisible(true);
		}, TIP_TRANSITION_MS);
	}, [tips.length]);

	useEffect(() => {
		if (tips.length <= 1) return;
		const id = window.setInterval(cycleTip, intervalMs);
		return () => window.clearInterval(id);
	}, [cycleTip, intervalMs, tips.length]);

	if (tips.length === 0) return null;

	return (
		<Box className={ui.tipGameSlot} aria-live="polite">
			<Text
				key={index}
				size="sm"
				c="white"
				className={`${ui.tipCard} ${ui.tipGameCard} ${visible ? ui.tipGameEnter : ui.tipGameExit}`}
			>
				{tips[index]}
			</Text>
		</Box>
	);
};

export default memo(RotatingTip);
