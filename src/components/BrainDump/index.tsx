import { useBrainDumpState } from "@/stores/states/brainDump";
import { ActionIcon, Box, Tooltip } from "@mantine/core";
import { useClickOutside, useHotkeys } from "@mantine/hooks";
import { type Ref, memo, useCallback, useEffect, useState } from "react";
import { FaBrain } from "react-icons/fa";
import styles from "./BrainDump.module.css";
import BrainDumpPanel from "./BrainDumpPanel";

const BrainDump = () => {
	const [opened, setOpened] = useState(false);
	const autoPurge = useBrainDumpState((s) => s.autoPurge);

	const close = useCallback(() => setOpened(false), []);
	const toggle = useCallback(() => setOpened((o) => !o), []);

	const anchorRef = useClickOutside<HTMLDivElement>(close);

	useEffect(() => {
		autoPurge();
	}, [autoPurge]);

	useHotkeys([
		[
			"mod+shift+D",
			(e) => {
				e.preventDefault();
				toggle();
			},
		],
	]);

	return (
		<Box ref={anchorRef as Ref<HTMLDivElement>} className={styles.anchor}>
			{opened && (
				<Box className={styles.panel} onMouseDown={(e) => e.stopPropagation()}>
					<BrainDumpPanel opened={opened} onClose={close} />
				</Box>
			)}
			<Tooltip label="Scratch pad (Ctrl+Shift+D)" position="left" withArrow>
				<ActionIcon
					type="button"
					className={styles.fab}
					data-expanded={opened || undefined}
					variant="subtle"
					color="gray"
					size="lg"
					radius="xl"
					aria-label="Open scratch pad"
					aria-expanded={opened}
					onClick={toggle}
				>
					<FaBrain size={16} />
				</ActionIcon>
			</Tooltip>
		</Box>
	);
};

export default memo(BrainDump);
