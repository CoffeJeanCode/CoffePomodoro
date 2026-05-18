import { AppDrawer } from "@/components/ui/AppDrawer";
import { AppToolbarButton } from "@/components/ui/AppToolbarButton";
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

const Helps = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<AppToolbarButton
				leftSection={<FaLightbulb />}
				onClick={() => setIsOpen(true)}
			>
				Helps
			</AppToolbarButton>
			<AppDrawer
				opened={isOpen}
				size="md"
				title="Helps"
				onClose={() => setIsOpen(false)}
				scrollAreaComponent={ScrollArea.Autosize}
			>
				<Stack gap="lg" py="xs">
					{helps.sections.map((section) => (
						<div key={section.title}>
							<Title
								order={3}
								size="h4"
								className={ui.sectionTitle}
								mb="sm"
							>
								{section.title}
							</Title>
							<List spacing="sm" icon={iconMap[section.icon]}>
								{section.items.map((item) => (
									<List.Item key={item}>
										<Text size="sm">{item}</Text>
									</List.Item>
								))}
							</List>
						</div>
					))}

					<div>
						<Title
							order={3}
							size="h4"
							className={ui.sectionTitle}
							mb="xs"
						>
							Hotkeys
						</Title>
						<Text size="sm" c="dimmed" mb="sm">
							Main
						</Text>
						<List spacing="sm">
							{helps.hotkeys.main.map((hotkey) => (
								<List.Item key={hotkey.key}>
									<Kbd mr="sm">{hotkey.key}</Kbd>
									<Text span size="sm">
										{hotkey.action}
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
