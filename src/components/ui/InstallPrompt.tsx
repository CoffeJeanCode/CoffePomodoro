import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useLanguage } from "@/context/LanguageContext";
import { useTimerState } from "@/stores";
import { ActionIcon, Badge, Tooltip, Transition } from "@mantine/core";
import { FaDownload } from "react-icons/fa";

const InstallPrompt = () => {
	const { t } = useLanguage();
	const { isInstallable, isInstalled, triggerInstall } = useInstallPrompt();
	const isRunning = useTimerState((s) => s.isRunning);

	if (isInstalled || !isInstallable) return null;

	return (
		<Transition mounted={!isRunning} transition="fade" duration={400}>
			{(styles) => (
				<Tooltip label={t.install.tooltip} position="bottom">
					<Badge
						variant="light"
						color="violet"
						size="lg"
						leftSection={
							<ActionIcon
								size="sm"
								color="violet"
								variant="transparent"
								onClick={triggerInstall}
							>
								<FaDownload size={12} />
							</ActionIcon>
						}
						style={styles}
						onClick={triggerInstall}
						classNames={{
							root: "install-prompt-badge",
						}}
						styles={{
							root: { cursor: "pointer", userSelect: "none" },
						}}
					>
						{t.install.label}
					</Badge>
				</Tooltip>
			)}
		</Transition>
	);
};

export default InstallPrompt;
