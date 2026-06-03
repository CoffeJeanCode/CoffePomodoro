import { useLanguage } from "@/context/LanguageContext";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { type FC, memo } from "react";

interface EnergyCheckModalProps {
	opened: boolean;
	onClose: () => void;
	onContinue: () => void;
	onDownshift: () => void;
}

const EnergyCheckModal: FC<EnergyCheckModalProps> = ({
	opened,
	onClose,
	onContinue,
	onDownshift,
}) => {
	const { t } = useLanguage();

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={t.energy.title}
			centered
			radius="md"
			overlayProps={{ blur: 3, backgroundOpacity: 0.55 }}
			styles={{
				title: { width: "100%", textAlign: "center", fontWeight: 600 },
				header: { justifyContent: "center" },
			}}
		>
			<Stack gap="lg">
				<Text size="sm" c="dimmed" ta="center">
					{t.energy.body}
				</Text>
				<Group grow gap="sm">
					<Button variant="light" color="gray" onClick={onContinue}>
						{t.energy.continue}
					</Button>
					<Button variant="filled" color="gray" onClick={onDownshift}>
						{t.energy.downshift}
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
};

export default memo(EnergyCheckModal);
