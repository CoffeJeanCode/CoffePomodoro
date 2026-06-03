import { Mode } from "@/models";
import type { DepthPresetKey } from "@/models/depth";
import {
	useDepthState,
	useInfoState,
	useOnboardingState,
	useTimerState,
} from "@/stores";
import { useCallback, useEffect, useMemo, useState } from "react";

export const ONBOARDING_STEPS = [
	"welcome",
	"rhythm",
	"intention",
	"ring",
	"settings",
	"brainDump",
	"endDay",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

/** Steps that dim the page and own the user's full attention. */
const BLOCKING_STEPS: readonly OnboardingStep[] = ["welcome", "rhythm"];

/** Steps that point at a real, already-rendered UI element. */
const SPOTLIGHT_STEPS: readonly OnboardingStep[] = [
	"settings",
	"brainDump",
	"endDay",
];

export interface OnboardingFlow {
	step: OnboardingStep;
	stepIndex: number;
	totalSteps: number;
	/** Dimmed, attention-capturing steps (welcome, rhythm). */
	isBlocking: boolean;
	/** Non-blocking steps that let the page stay interactive. */
	isCoach: boolean;
	/** Steps anchored to a real UI element. */
	isSpotlight: boolean;
	isIntention: boolean;
	goTo: (step: OnboardingStep) => void;
	skip: () => void;
	selectRhythm: (key: DepthPresetKey) => void;
}

/**
 * Owns the ritual's state machine and its coordination with the real Timer
 * stores, keeping side effects out of the presentational layer.
 *
 * Octalysis mapping: welcome (CD1 glimpse) → rhythm (CD4 ownership) →
 * intention (commitment hook) → ring (CD2 First Major Win State).
 */
export const useOnboardingFlow = (): OnboardingFlow => {
	const [step, setStep] = useState<OnboardingStep>("welcome");

	const completeOnboarding = useOnboardingState((s) => s.completeOnboarding);
	const setActivePreset = useDepthState((s) => s.setActivePreset);
	const setMode = useInfoState((s) => s.setMode);
	const clearSessionIntention = useInfoState((s) => s.clearSessionIntention);
	const intentionConfirmed = useInfoState((s) => s.intentionConfirmed);
	const isRunning = useTimerState((s) => s.isRunning);
	const resetForNext = useTimerState((s) => s.resetForNext);

	// Guarantee a clean focus slate so the ritual flows on both the first run
	// and on replay (when a session may already be in progress).
	useEffect(() => {
		setMode(Mode.Pomodoro);
		clearSessionIntention();
		resetForNext();
	}, [setMode, clearSessionIntention, resetForNext]);

	// The intention step hands control to the real Timer; advance once the user
	// confirms their intention and the focus session actually starts.
	useEffect(() => {
		if (step === "intention" && intentionConfirmed && isRunning) {
			setStep("ring");
		}
	}, [step, intentionConfirmed, isRunning]);

	const skip = useCallback(
		() => completeOnboarding(),
		[completeOnboarding],
	);

	const goTo = useCallback((next: OnboardingStep) => setStep(next), []);

	const selectRhythm = useCallback(
		(key: DepthPresetKey) => {
			setActivePreset(key);
			setStep("intention");
		},
		[setActivePreset],
	);

	return useMemo<OnboardingFlow>(() => {
		const stepIndex = ONBOARDING_STEPS.indexOf(step);
		const isBlocking = BLOCKING_STEPS.includes(step);
		return {
			step,
			stepIndex,
			totalSteps: ONBOARDING_STEPS.length,
			isBlocking,
			isCoach: !isBlocking,
			isSpotlight: SPOTLIGHT_STEPS.includes(step),
			isIntention: step === "intention",
			goTo,
			skip,
			selectRhythm,
		};
	}, [step, goTo, skip, selectRhythm]);
};
