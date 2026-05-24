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
	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title="Evaluación de Energía"
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
					Has completado varios ciclos de alta intensidad de forma continua.
					Tómate un segundo para escanear tu mente y tus ojos antes de
					continuar.
				</Text>
				<Group grow gap="sm">
					<Button variant="light" color="gray" onClick={onContinue}>
						Aún tengo claridad
					</Button>
					<Button variant="filled" color="gray" onClick={onDownshift}>
						Necesito una pausa
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
};

export default memo(EnergyCheckModal);
