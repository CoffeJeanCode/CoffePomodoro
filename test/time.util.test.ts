import { describe, expect, it } from "bun:test";
import {
	getDate,
	getEndOfWeek,
	getStartOfWeek,
	hasWeekRolledOver,
} from "@/utils/time.util";

// Drives the "cambio de semana" (week rollover) in pages/Home: when today
// passes the tracked end-of-week boundary, weekly stats roll over.
describe("week change (cambio de semana)", () => {
	describe("hasWeekRolledOver", () => {
		const endWeek = new Date(2026, 0, 11, 23, 59, 59); // Sunday

		it("is false before the boundary", () => {
			const today = new Date(2026, 0, 9, 12, 0, 0); // Friday, same week
			expect(hasWeekRolledOver(today, endWeek)).toBe(false);
		});

		it("is false exactly at the boundary", () => {
			expect(hasWeekRolledOver(new Date(endWeek), endWeek)).toBe(false);
		});

		it("is true once today passes the boundary", () => {
			const today = new Date(2026, 0, 12, 0, 0, 1); // next Monday
			expect(hasWeekRolledOver(today, endWeek)).toBe(true);
		});

		it("accepts serialized dates from persisted state", () => {
			// Info store persists `endWeek` as an ISO string; the helper must
			// still compare correctly after rehydration.
			const persistedEndWeek = new Date(2026, 0, 11).toISOString();
			const today = new Date(2026, 0, 13).toISOString();
			expect(
				hasWeekRolledOver(new Date(today), new Date(persistedEndWeek)),
			).toBe(true);
		});
	});

	describe("week boundaries (weekStartsOn = Monday)", () => {
		const wednesday = new Date(2026, 0, 7); // 2026-01-07

		it("getStartOfWeek returns the Monday of that week", () => {
			const start = getStartOfWeek(wednesday, 1);
			expect(start.getDay()).toBe(1);
			expect(getDate(start)).toBe("2026-01-05");
		});

		it("getEndOfWeek returns the Sunday of that week", () => {
			const end = getEndOfWeek(wednesday, 1);
			expect(end.getDay()).toBe(0);
			expect(getDate(end)).toBe("2026-01-11");
		});

		it("a day past getEndOfWeek triggers the rollover", () => {
			const end = getEndOfWeek(wednesday, 1);
			const nextMonday = new Date(2026, 0, 12);
			expect(hasWeekRolledOver(nextMonday, end)).toBe(true);
		});
	});
});
