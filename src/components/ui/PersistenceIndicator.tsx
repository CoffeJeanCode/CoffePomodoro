import { useStorageHealth } from "@/hooks/useStorageHealth";
import { useLanguage } from "@/context/LanguageContext";
import { ActionIcon, Tooltip } from "@mantine/core";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import styles from "./PersistenceIndicator.module.css";

const PersistenceIndicator = () => {
	const { t } = useLanguage();
	const { healthy } = useStorageHealth();

	return (
		<div className={styles.anchor}>
			<Tooltip
				label={healthy ? t.persistence.healthy : t.persistence.unhealthy}
				position="right"
			>
				<ActionIcon
					size="lg"
					variant="subtle"
					color={healthy ? "green" : "yellow"}
					radius="xl"
					className={styles.fab}
					aria-label={healthy ? t.persistence.healthy : t.persistence.unhealthy}
				>
					{healthy ? (
						<FaCheckCircle size={16} />
					) : (
						<FaExclamationTriangle size={16} />
					)}
				</ActionIcon>
			</Tooltip>
		</div>
	);
};

export default PersistenceIndicator;
