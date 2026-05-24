import { DEFAULT_UI_STYLE, type UIStyleId } from "./uiStyles";

/**
 * Module-level registry of the active structural style id, so pure render-time
 * utils (PiP CSS, UI sounds) can resolve the current shape language without
 * subscribing to React state.
 */
let active: UIStyleId = DEFAULT_UI_STYLE;

export const getActiveUIStyleId = (): UIStyleId => active;

export const setActiveUIStyleId = (id: UIStyleId): void => {
	active = id;
};

export type { UIStyleId };
