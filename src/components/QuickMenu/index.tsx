import { useAppearance } from "@/hooks/useAppearance";
import { useSchemasState, useTimerState } from "@/stores";
import { UI_STYLES, UI_STYLE_ORDER } from "@/theme/uiStyles";
import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { RiTimerLine } from "react-icons/ri";

const QuickMenu = () => {
	const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
	const [opened, { open, close }] = useDisclosure(false);
	const { schemas, setCurrentSchema, currentSchemaId } = useSchemasState();
	const resetForNext = useTimerState((s) => s.resetForNext);
	const { activeStyle, setUIStyle } = useAppearance();

	useEffect(() => {
		const handleQuickMenu = (evt: MouseEvent) => {
			evt.preventDefault();
			open();
			setMenuPosition({ top: evt.clientY, left: evt.clientX });
		};

		const handleBodyClick = () => {
			close();
		};

		document.body.addEventListener("contextmenu", handleQuickMenu);
		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("contextmenu", handleQuickMenu);
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, [open, close]);

	return (
		<Menu
			opened={opened}
			width={230}
			zIndex={300}
			withinPortal
			closeOnItemClick={false}
			styles={{
				dropdown: {
					position: "fixed",
					top: menuPosition.top,
					left: menuPosition.left,
					maxHeight: "80vh",
					overflowY: "auto",
				},
			}}
		>
			<Menu.Dropdown onClick={(e) => e.stopPropagation()}>
				<Menu.Label>Preset</Menu.Label>
				{schemas.map((schema) => {
					const isActive = schema.id === currentSchemaId;
					return (
						<Menu.Item
							key={schema.id}
							leftSection={<RiTimerLine size={16} />}
							color={isActive ? "red" : undefined}
							variant={isActive ? "light" : "subtle"}
							onClick={() => {
								const newId = schema.id === currentSchemaId ? "" : schema.id;
								resetForNext();
								setCurrentSchema(newId);
							}}
						>
							{schema.title}
						</Menu.Item>
					);
				})}

				<Menu.Divider />
				<Menu.Label>Style</Menu.Label>
				{UI_STYLE_ORDER.map((id) => {
					const style = UI_STYLES[id];
					const isActive = id === activeStyle;
					return (
						<Menu.Item
							key={id}
							leftSection={<span aria-hidden>{style.icon}</span>}
							color={isActive ? "red" : undefined}
							variant={isActive ? "light" : "subtle"}
							onClick={() => setUIStyle(id)}
						>
							{style.label}
						</Menu.Item>
					);
				})}
			</Menu.Dropdown>
		</Menu>
	);
};

export default QuickMenu;
