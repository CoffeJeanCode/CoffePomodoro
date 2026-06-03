import { useLanguage } from "@/context/LanguageContext";
import { downloadExportedData, importDataFromFile } from "@/utils/dataExport";
import {
	Alert,
	Box,
	Button,
	Code,
	FileInput,
	Group,
	Stack,
	Text,
} from "@mantine/core";
import { type FC, useState } from "react";
import { FaDownload, FaUpload } from "react-icons/fa";
import styles from "./Settings.module.css";

const DataSettings: FC = () => {
	const { t } = useLanguage();
	const [importError, setImportError] = useState<string | null>(null);
	const [importSuccess, setImportSuccess] = useState(false);
	const [importingFile, setImportingFile] = useState<File | null>(null);

	const handleImport = async () => {
		if (!importingFile) return;
		setImportError(null);
		setImportSuccess(false);
		const result = await importDataFromFile(importingFile);
		if (result.success) {
			setImportSuccess(true);
			setImportingFile(null);
			setTimeout(() => window.location.reload(), 1500);
		} else {
			setImportError(result.error ?? t.settings.data.importFailed);
		}
	};

	return (
		<Stack gap="md">
			<Box>
				<Text size="sm" fw={500} mb="xs">
					{t.settings.data.exportTitle}
				</Text>
				<Text size="xs" c="dimmed" mb="sm">
					{t.settings.data.exportDesc}
				</Text>
				<Button
					variant="light"
					color="violet"
					size="xs"
					leftSection={<FaDownload size={12} />}
					onClick={downloadExportedData}
				>
					{t.settings.data.exportButton}
				</Button>
			</Box>

			<Box>
				<Text size="sm" fw={500} mb="xs">
					{t.settings.data.importTitle}
				</Text>
				<Text size="xs" c="dimmed" mb="sm">
					{t.settings.data.importDesc}
				</Text>
				<Group gap="xs">
					<FileInput
						size="xs"
						accept=".json"
						placeholder={t.settings.data.importPlaceholder}
						value={importingFile}
						onChange={setImportingFile}
						clearable
						className={styles.fileInputFlex}
					/>
					<Button
						variant="light"
						color="violet"
						size="xs"
						leftSection={<FaUpload size={12} />}
						onClick={handleImport}
						disabled={!importingFile}
					>
						{t.settings.data.importButton}
					</Button>
				</Group>
			</Box>

			{importError && (
				<Alert color="red" title={t.settings.data.importFailed}>
					<Code block>{importError}</Code>
				</Alert>
			)}
			{importSuccess && (
				<Alert color="green" title={t.settings.data.importSuccess}>
					{t.settings.data.importReloading}
				</Alert>
			)}
		</Stack>
	);
};

export default DataSettings;
