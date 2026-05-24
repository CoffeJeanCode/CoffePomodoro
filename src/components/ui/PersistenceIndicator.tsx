import { useStorageHealth } from "@/hooks/useStorageHealth";
import { ActionIcon, Tooltip } from "@mantine/core";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import styles from "./PersistenceIndicator.module.css";

const PersistenceIndicator = () => {
	const { healthy } = useStorageHealth();

	return (
		<div className={styles.anchor}>
			<Tooltip
				label={
					healthy ? "Data saved locally" : "Storage issue — export your data"
				}
				position="right"
			>
				<ActionIcon
					size="lg"
					variant="subtle"
					color={healthy ? "green" : "yellow"}
					radius="xl"
					className={styles.fab}
					aria-label={healthy ? "Data saved locally" : "Storage issue"}
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
