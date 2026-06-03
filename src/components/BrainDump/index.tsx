import {
	onboardingAnchorProps,
	useOnboardingAnchorDismiss,
} from "@/components/Onboarding/anchors";
import { useBrainDumpState } from "@/stores/states/brainDump";
import { useLanguage } from "@/context/LanguageContext";
import { ActionIcon, Box, Tooltip } from "@mantine/core";
import { useClickOutside, useHotkeys } from "@mantine/hooks";
import { type Ref, memo, useCallback, useEffect, useState } from "react";
import { FaBrain } from "react-icons/fa";
import styles from "./BrainDump.module.css";
import BrainDumpPanel from "./BrainDumpPanel";

const BrainDump = () => {
	const { t } = useLanguage();
	const [opened, setOpened] = useState(false);
	const autoPurge = useBrainDumpState((s) => s.autoPurge);

	const close = useCallback(() => setOpened(false), []);
	const toggle = useCallback(() => setOpened((o) => !o), []);
	useOnboardingAnchorDismiss(close);

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
			<Tooltip label={t.brainDump.tooltip} position="left" withArrow openDelay={400}>
				<ActionIcon
					type="button"
					className={styles.utilityTrigger}
					data-expanded={opened || undefined}
					variant="transparent"
					size="xl"
					radius="xl"
					aria-label={t.brainDump.ariaLabel}
					aria-expanded={opened}
					onClick={toggle}
					{...onboardingAnchorProps("brainDump")}
				>
					<FaBrain size={18} />
				</ActionIcon>
			</Tooltip>
		</Box>
	);
};

export default memo(BrainDump);
