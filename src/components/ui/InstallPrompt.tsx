import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useTimerState } from "@/stores";
import { ActionIcon, Badge, Tooltip, Transition } from "@mantine/core";
import { FaDownload } from "react-icons/fa";

const InstallPrompt = () => {
	const { isInstallable, isInstalled, triggerInstall } = useInstallPrompt();
	const isRunning = useTimerState((s) => s.isRunning);

	if (isInstalled || !isInstallable) return null;

	return (
		<Transition mounted={!isRunning} transition="fade" duration={400}>
			{(styles) => (
				<Tooltip
					label="Install app for distraction-free focus"
					position="bottom"
				>
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
						Install
					</Badge>
				</Tooltip>
			)}
		</Transition>
	);
};

export default InstallPrompt;
