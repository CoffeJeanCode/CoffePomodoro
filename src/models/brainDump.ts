export interface BrainDumpNote {
	id: string;
	text: string;
	capturedAt: number;
}

export interface BrainDumpState {
	notes: BrainDumpNote[];
	lastPurgeAt: number;
	addNote: (text: string) => void;
	discardNote: (id: string) => void;
	discardAll: () => void;
	getNotes: () => BrainDumpNote[];
	autoPurge: () => void;
	resetBrainDump: () => void;
}
