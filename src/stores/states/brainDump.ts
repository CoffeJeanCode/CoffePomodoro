import type { BrainDumpNote, BrainDumpState } from "@/models/brainDump";
import { createId } from "@/utils/extra.utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

const initialState: { notes: BrainDumpNote[]; lastPurgeAt: number } = {
	notes: [],
	lastPurgeAt: Date.now(),
};

function purgeExpiredNotes(notes: BrainDumpNote[], now: number): BrainDumpNote[] {
	return notes.filter((n) => now - n.capturedAt < TWENTY_FOUR_HOURS_MS);
}

export const useBrainDumpState = create<BrainDumpState>()(
	persist(
		(set, get) => ({
			...initialState,
			addNote: (text) => {
				const trimmed = text.trim();
				if (!trimmed) return;
				set((state) => ({
					notes: [
						{ id: createId(), text: trimmed, capturedAt: Date.now() },
						...state.notes,
					],
				}));
			},
			discardNote: (id) =>
				set((state) => ({
					notes: state.notes.filter((n) => n.id !== id),
				})),
			discardAll: () => set({ notes: [] }),
			getNotes: () => get().notes,
			autoPurge: () => {
				const now = Date.now();
				const cleaned = purgeExpiredNotes(get().notes, now);
				if (cleaned.length !== get().notes.length) {
					set({ notes: cleaned, lastPurgeAt: now });
				}
			},
			resetBrainDump: () => set(initialState),
		}),
		{
			name: "brainDump",
			version: storeVersion,
			merge: (persisted, current) => {
				const p = (persisted ?? {}) as Partial<{
					notes: BrainDumpNote[];
					lastPurgeAt: number;
				}>;
				const now = Date.now();
				const notes = purgeExpiredNotes(p.notes ?? current.notes, now);
				return {
					...current,
					...p,
					notes,
					lastPurgeAt: p.lastPurgeAt ?? now,
				};
			},
		},
	),
);
