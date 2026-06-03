import { AppDrawer } from "@/components/ui/AppDrawer";
import { AppToolbarButton } from "@/components/ui/AppToolbarButton";
import { useLanguage } from "@/context/LanguageContext";
import ui from "@/styles/ui.module.css";
import { Kbd, List, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { FaBrain, FaHeadphones, FaLightbulb, FaMugHot } from "react-icons/fa";
import { helps } from "./helps.data";

const iconMap: Record<string, JSX.Element> = {
	mind: <FaBrain size={14} />,
	break: <FaMugHot size={14} />,
	sound: <FaHeadphones size={14} />,
};

const sectionTitle = (key: string, t: ReturnType<typeof useLanguage>["t"]) => {
	const map: Record<string, string> = {
		"Flow State": t.helps.sections.flowState,
		"Break Ideas": t.helps.sections.breakIdeas,
		Soundscapes: t.helps.sections.soundscapes,
	};
	return map[key] ?? key;
};

const itemText = (text: string, t: ReturnType<typeof useLanguage>["t"]) => {
	const map: Record<string, string> = {
		"Focus without urgency — progress is the ring, not words or countdowns":
			t.helps.items.focusRing,
		"Set an intention before each session instead of chasing countdowns":
			t.helps.items.setIntention,
		"End time appears below the ring only while the timer is running":
			t.helps.items.endTime,
		"Double-click to update your intention": t.helps.items.doubleClick,
		"Ctrl+Shift+D opens the scratch pad (bottom-right) — jot thoughts without leaving focus":
			t.helps.items.scratchPad,
		"Short Nap": t.helps.items.shortNap,
		"Clean Up": t.helps.items.cleanUp,
		Meditate: t.helps.items.meditate,
		Posture: t.helps.items.posture,
		"Go outside": t.helps.items.goOutside,
		Stretches: t.helps.items.stretches,
		"Mini exercise": t.helps.items.miniExercise,
		"Rain — steady background for deep concentration": t.helps.items.rain,
		"Waves — rhythmic presence to anchor attention": t.helps.items.waves,
		"Wind — open space for creative flow": t.helps.items.wind,
	};
	return map[text] ?? text;
};

const hotkeyAction = (
	action: string,
	t: ReturnType<typeof useLanguage>["t"],
) => {
	const map: Record<string, string> = {
		"Toggle timer (play / pause)": t.helps.hotkeyActions.toggle,
		"Skip to next segment": t.helps.hotkeyActions.skip,
		"End session (focus) or skip (break)": t.helps.hotkeyActions.end,
		"Adjust session length for this cycle": t.helps.hotkeyActions.adjust,
		"Toggle full screen": t.helps.hotkeyActions.fullscreen,
		"Toggle Picture-in-Picture": t.helps.hotkeyActions.pip,
		"Quick-select a preset schema": t.helps.hotkeyActions.preset,
	};
	return map[action] ?? action;
};

const Helps = () => {
	const { t } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<AppToolbarButton
				leftSection={<FaLightbulb />}
				onClick={() => setIsOpen(true)}
			>
				{t.helps.button}
			</AppToolbarButton>
			<AppDrawer
				opened={isOpen}
				size="md"
				title={t.helps.title}
				onClose={() => setIsOpen(false)}
				scrollAreaComponent={ScrollArea.Autosize}
			>
				<Stack gap="lg" py="xs">
					{helps.sections.map((section) => (
						<div key={section.title}>
							<Title order={3} size="h4" className={ui.sectionTitle} mb="sm">
								{sectionTitle(section.title, t)}
							</Title>
							<List spacing="sm" icon={iconMap[section.icon]}>
								{section.items.map((item) => (
									<List.Item key={item}>
										<Text size="sm">{itemText(item, t)}</Text>
									</List.Item>
								))}
							</List>
						</div>
					))}

					<div>
						<Title order={3} size="h4" className={ui.sectionTitle} mb="xs">
							{t.helps.hotkeys}
						</Title>
						<Text size="sm" c="dimmed" mb="sm">
							{t.helps.main}
						</Text>
						<List spacing="sm">
							{helps.hotkeys.main.map((hotkey) => (
								<List.Item key={hotkey.key}>
									<Kbd mr="sm">{hotkey.key}</Kbd>
									<Text span size="sm">
										{hotkeyAction(hotkey.action, t)}
									</Text>
								</List.Item>
							))}
						</List>
					</div>
				</Stack>
			</AppDrawer>
		</>
	);
};

export default Helps;
