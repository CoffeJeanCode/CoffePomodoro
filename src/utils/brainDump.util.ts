import type { BrainDumpNote } from "@/models/brainDump";
import { getDate } from "./time.util";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export function isBrainDumpNoteExpired(
	capturedAt: number,
	now = Date.now(),
): boolean {
	if (now - capturedAt >= TWENTY_FOUR_HOURS_MS) return true;
	const noteDay = getDate(new Date(capturedAt));
	const today = getDate(new Date(now));
	return noteDay !== today;
}

export function purgeExpiredBrainDumpNotes(
	notes: BrainDumpNote[],
	now = Date.now(),
): BrainDumpNote[] {
	return notes.filter((note) => !isBrainDumpNoteExpired(note.capturedAt, now));
}

export function formatBrainDumpMarkdown(notes: BrainDumpNote[]): string {
	if (notes.length === 0) return "";
	const lines = notes.map((note) => `- ${note.text.trim()}`).filter(Boolean);
	return ["## Brain dump", "", ...lines].join("\n");
}

export function copyBrainDumpToClipboard(notes: BrainDumpNote[]): Promise<void> {
	const markdown = formatBrainDumpMarkdown(notes);
	if (!markdown) return Promise.resolve();
	return navigator.clipboard.writeText(markdown);
}
