import { useLanguage } from "@/context/LanguageContext";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { type FC, memo, useEffect, useState } from "react";

interface SessionIntentionProps {
	onConfirm: (intention: string) => void;
	initialValue?: string;
	submitLabel?: string;
	onCancel?: () => void;
	centered?: boolean;
}

const SessionIntention: FC<SessionIntentionProps> = ({
	onConfirm,
	initialValue = "",
	submitLabel = "Begin focus",
	onCancel,
	centered = false,
}) => {
	const { t } = useLanguage();
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const submit = () => {
		const trimmed = value.trim();
		if (!trimmed) return;
		onConfirm(trimmed);
	};

	return (
		<Stack
			gap="xs"
			w="100%"
			maw={260}
			mx={centered ? "auto" : undefined}
			align={centered ? "center" : "stretch"}
		>
			<Textarea
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				placeholder={t.timer.intention.placeholder}
				minRows={1}
				maxRows={2}
				autosize
				radius="md"
				size="sm"
				autoFocus
				onKeyDown={(e) => {
					if (e.key === "Escape" && onCancel) {
						e.preventDefault();
						onCancel();
						return;
					}
					if (e.key !== "Enter" || e.shiftKey) return;
					const trimmed = value.trim();
					if (!trimmed) return;
					e.preventDefault();
					onConfirm(trimmed);
				}}
			/>
			<Group
				gap="xs"
				grow={!onCancel}
				justify={centered ? "center" : undefined}
			>
				{onCancel && (
					<Button variant="subtle" color="gray" size="sm" onClick={onCancel}>
						{t.timer.intention.cancel}
					</Button>
				)}
				<Button
					fullWidth={!onCancel}
					color="red"
					variant="light"
					size="sm"
					disabled={!value.trim()}
					onClick={submit}
				>
					{submitLabel}
				</Button>
			</Group>
		</Stack>
	);
};

export default memo(SessionIntention);
