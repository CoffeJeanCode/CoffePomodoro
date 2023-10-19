import { useSchemasState } from "@/stores";
import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { RiTimerLine } from "react-icons/ri";

const QuickMenu = () => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [opened, { open, close }] = useDisclosure(false);
  const { schemas, setCurrentSchema, currentSchemaId } = useSchemasState();
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
  }, []);

  return (
    <Menu
      opened={opened}
      width={200}
      zIndex={3}
      styles={{
        dropdown: {
          position: "fixed",
          top: menuPosition.top,
          left: menuPosition.left,
        },
      }}
    >
      <Menu.Dropdown>
        {schemas.map((schema) => (
          <Menu.Item
            key={schema.id}
            leftSection={<RiTimerLine />}
            onClick={() =>
              setCurrentSchema(schema.id === currentSchemaId ? "" : schema.id)
            }
            bg={schema.id === currentSchemaId ? "blue" : ""}
          >
            {schema.title}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default QuickMenu;
