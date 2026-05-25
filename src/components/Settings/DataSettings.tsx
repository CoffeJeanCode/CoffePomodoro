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
			setImportError(result.error ?? "Import failed");
		}
	};

	return (
		<Stack gap="md">
			<Box>
				<Text size="sm" fw={500} mb="xs">
					Export your data
				</Text>
				<Text size="xs" c="dimmed" mb="sm">
					Download all your settings, stats, schemas, and Brain Dump notes as a
					JSON file.
				</Text>
				<Button
					variant="light"
					color="violet"
					size="xs"
					leftSection={<FaDownload size={12} />}
					onClick={downloadExportedData}
				>
					Export JSON
				</Button>
			</Box>

			<Box>
				<Text size="sm" fw={500} mb="xs">
					Import data
				</Text>
				<Text size="xs" c="dimmed" mb="sm">
					Restore from a previously exported backup file. This will overwrite
					all current data.
				</Text>
				<Group gap="xs">
					<FileInput
						size="xs"
						accept=".json"
						placeholder="Select backup file"
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
						Import
					</Button>
				</Group>
			</Box>

			{importError && (
				<Alert color="red" title="Import failed">
					<Code block>{importError}</Code>
				</Alert>
			)}
			{importSuccess && (
				<Alert color="green" title="Import successful">
					Data restored. Reloading...
				</Alert>
			)}
		</Stack>
	);
};

export default DataSettings;
