import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

interface OnboardingState {
	/** Whether the new-user first-run ritual has been finished or skipped. */
	hasCompletedOnboarding: boolean;
	completeOnboarding: () => void;
	/** Re-arms the ritual so it shows again (used by "replay tutorial"). */
	restartOnboarding: () => void;
}

export const useOnboardingState = create<OnboardingState>()(
	persist(
		(set) => ({
			hasCompletedOnboarding: false,
			completeOnboarding: () => set({ hasCompletedOnboarding: true }),
			restartOnboarding: () => set({ hasCompletedOnboarding: false }),
		}),
		{
			name: "onboarding",
			version: storeVersion,
		},
	),
);
