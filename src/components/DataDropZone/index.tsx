import { importDataFromFile } from "@/utils/dataExport";
import { useLanguage } from "@/context/LanguageContext";
import { Box, Loader, Text } from "@mantine/core";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FaCheck, FaExclamationTriangle, FaFileImport } from "react-icons/fa";
import styles from "./DataDropZone.module.css";

type Status = "idle" | "importing" | "success" | "error";

/** Detects whether a drag event is carrying files (vs text/elements). */
const draggingFiles = (e: DragEvent) =>
	Array.from(e.dataTransfer?.types ?? []).includes("Files");

const DataDropZone = () => {
	const { t } = useLanguage();
	const [isDragging, setIsDragging] = useState(false);
	const [status, setStatus] = useState<Status>("idle");
	const [errorMsg, setErrorMsg] = useState("");
	const dragDepth = useRef(0);

	const handleFile = useCallback(
		async (file: File) => {
			setStatus("importing");
			const result = await importDataFromFile(file);
			if (result.success) {
				setStatus("success");
				setTimeout(() => window.location.reload(), 1500);
			} else {
				setErrorMsg(result.error ?? t.dataDropZone.failed);
				setStatus("error");
				setTimeout(() => setStatus("idle"), 4000);
			}
		},
		[t.dataDropZone.failed],
	);

	useEffect(() => {
		const onDragEnter = (e: DragEvent) => {
			if (!draggingFiles(e)) return;
			e.preventDefault();
			dragDepth.current += 1;
			setIsDragging(true);
		};
		const onDragOver = (e: DragEvent) => {
			if (!draggingFiles(e)) return;
			e.preventDefault();
		};
		const onDragLeave = (e: DragEvent) => {
			if (!draggingFiles(e)) return;
			dragDepth.current = Math.max(0, dragDepth.current - 1);
			if (dragDepth.current === 0) setIsDragging(false);
		};
		const onDrop = (e: DragEvent) => {
			if (!draggingFiles(e)) return;
			e.preventDefault();
			dragDepth.current = 0;
			setIsDragging(false);
			const file = e.dataTransfer?.files?.[0];
			if (file) void handleFile(file);
		};

		window.addEventListener("dragenter", onDragEnter);
		window.addEventListener("dragover", onDragOver);
		window.addEventListener("dragleave", onDragLeave);
		window.addEventListener("drop", onDrop);
		return () => {
			window.removeEventListener("dragenter", onDragEnter);
			window.removeEventListener("dragover", onDragOver);
			window.removeEventListener("dragleave", onDragLeave);
			window.removeEventListener("drop", onDrop);
		};
	}, [handleFile]);

	const visible = isDragging || status !== "idle";
	if (!visible) return null;

	return (
		<Box className={styles.overlay}>
			<Box className={styles.frame}>
				{status === "importing" ? (
					<>
						<Loader color="violet" />
						<Text className={styles.title}>{t.dataDropZone.importing}</Text>
					</>
				) : status === "success" ? (
					<>
						<FaCheck size={32} color="var(--mantine-color-teal-5)" />
						<Text className={styles.title}>{t.dataDropZone.success}</Text>
					</>
				) : status === "error" ? (
					<>
						<FaExclamationTriangle
							size={30}
							color="var(--mantine-color-red-5)"
						/>
						<Text className={styles.title}>{t.dataDropZone.failed}</Text>
						<Text className={styles.sub}>{errorMsg}</Text>
					</>
				) : (
					<>
						<FaFileImport size={32} color="var(--mantine-color-violet-4)" />
						<Text className={styles.title}>{t.dataDropZone.dropTitle}</Text>
						<Text className={styles.sub}>{t.dataDropZone.dropSub}</Text>
					</>
				)}
			</Box>
		</Box>
	);
};

export default memo(DataDropZone);
