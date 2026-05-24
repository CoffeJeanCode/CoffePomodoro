import { useUIStyleState } from "@/stores/states/uiStyle";
import type { FC } from "react";
import {
	RiCheckLine,
	RiCloseLine,
	RiFullscreenLine,
	RiPlayLine,
	RiQuestionLine,
	RiRefreshLine,
	RiSettings3Line,
	RiSkipForwardLine,
	RiTimerLine,
	RiVolumeUpLine,
} from "react-icons/ri";

export type IconName =
	| "play"
	| "check"
	| "close"
	| "skip"
	| "refresh"
	| "settings"
	| "volume"
	| "fullscreen"
	| "question"
	| "timer";

const LINE_ICONS: Record<IconName, FC<{ size?: number }>> = {
	play: RiPlayLine,
	check: RiCheckLine,
	close: RiCloseLine,
	skip: RiSkipForwardLine,
	refresh: RiRefreshLine,
	settings: RiSettings3Line,
	volume: RiVolumeUpLine,
	fullscreen: RiFullscreenLine,
	question: RiQuestionLine,
	timer: RiTimerLine,
};

const ICON_SETS: Record<string, Record<IconName, FC<{ size?: number }>>> = {
	hud: LINE_ICONS,
	doodle: LINE_ICONS,
	line: LINE_ICONS,
};

interface IconProps {
	name: IconName;
	size?: number;
}

export const Icon: FC<IconProps> = ({ name, size = 18 }) => {
	const activeStyle = useUIStyleState((s) => s.activeStyle);
	const iconSet = ICON_SETS[activeStyle] ?? ICON_SETS.line;
	const Component = iconSet[name];
	if (!Component) return null;
	return <Component size={size} />;
};
