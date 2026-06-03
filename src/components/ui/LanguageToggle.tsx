import { useLanguage } from "@/context/LanguageContext";
import { ActionIcon, Tooltip } from "@mantine/core";
import { memo } from "react";
import styles from "./LanguageToggle.module.css";

const LanguageToggle = () => {
	const { toggleLang, t } = useLanguage();

	return (
		<Tooltip label={t.language.switchTo} position="bottom" withArrow>
			<ActionIcon
				className={styles.toggle}
				variant="subtle"
				color="gray"
				size="sm"
				radius="md"
				aria-label={t.language.switchTo}
				onClick={toggleLang}
			>
				<span className={styles.label}>{t.language.current}</span>
			</ActionIcon>
		</Tooltip>
	);
};

export default memo(LanguageToggle);
