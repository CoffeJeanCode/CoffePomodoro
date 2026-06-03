import { useConfigState } from "@/stores";
import type { FC } from "react";
import EnsoCore from "./VisualCores/EnsoCore";
import RipplesCore from "./VisualCores/RipplesCore";
import StardustCore from "./VisualCores/StardustCore";

interface TimerCoreShifterProps {
	isPlaying: boolean;
	isBreak: boolean;
}

const TimerCoreShifter: FC<TimerCoreShifterProps> = ({ isPlaying, isBreak }) => {
	const visualMode = useConfigState((s) => s.config.visualMode);

	switch (visualMode) {
		case "stardust":
			return <StardustCore isPlaying={isPlaying} isBreak={isBreak} />;
		case "enso":
			return <EnsoCore isPlaying={isPlaying} isBreak={isBreak} />;
		default:
			return <RipplesCore isPlaying={isPlaying} isBreak={isBreak} />;
	}
};

export default TimerCoreShifter;
