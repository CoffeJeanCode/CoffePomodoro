import { useEffect } from "react";

/**
 * Shared contract between the onboarding spotlight steps and the real UI
 * elements they point at. Tagging a component with {@link onboardingAnchorProps}
 * lets the ritual locate it dynamically via {@link onboardingAnchorSelector}.
 */
export type OnboardingAnchor = "settings" | "brainDump" | "endDay";

const ATTR = "data-onboarding";
const DISMISS_EVENT = "onboarding:dismiss-anchors";

export const onboardingAnchorProps = (anchor: OnboardingAnchor) => ({
	[ATTR]: anchor,
});

export const onboardingAnchorSelector = (anchor: OnboardingAnchor) =>
	`[${ATTR}="${anchor}"]`;

/** Ask every anchored surface to close, for a clean step-to-step handoff. */
export const dismissOnboardingAnchors = () => {
	window.dispatchEvent(new Event(DISMISS_EVENT));
};

/** Subscribe an anchored surface's `close` to the onboarding dismiss signal. */
export const useOnboardingAnchorDismiss = (close: () => void) => {
	useEffect(() => {
		window.addEventListener(DISMISS_EVENT, close);
		return () => window.removeEventListener(DISMISS_EVENT, close);
	}, [close]);
};
