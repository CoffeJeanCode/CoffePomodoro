import { useLanguage } from "@/context/LanguageContext";
import { formatMessage } from "@/locales/formatMessage";
import { Button } from "@mantine/core";
import { type KeyboardEvent, memo, useCallback, useEffect, useRef } from "react";
import OnboardingCard from "./OnboardingCard";
import styles from "./Onboarding.module.css";
import RhythmPicker from "./RhythmPicker";
import SpotlightStep from "./SpotlightStep";
import type { OnboardingAnchor } from "./anchors";
import {
	ONBOARDING_STEPS,
	type OnboardingStep,
	useOnboardingFlow,
} from "./useOnboardingFlow";

type SpotlightName = "settings" | "brainDump" | "endDay";

/** Ordered spotlight steps: which element to point at and where to go next. */
const SPOTLIGHT_FLOW: {
	step: SpotlightName;
	anchor: OnboardingAnchor;
	next: OnboardingStep | null;
}[] = [
	{ step: "settings", anchor: "settings", next: "brainDump" },
	{ step: "brainDump", anchor: "brainDump", next: "endDay" },
	{ step: "endDay", anchor: "endDay", next: null },
];

/**
 * "El Primer Ritual" — Octalysis-aligned first-run onboarding.
 *
 * Walks a brand-new user through their first real focus cycle, then points at
 * the key surfaces (Settings, Brain Dump, End Day) by dynamically tracking the
 * real elements. View-only: state lives in {@link useOnboardingFlow}, the step
 * shell in {@link OnboardingCard}, dynamic anchoring in {@link SpotlightStep}.
 */
const Onboarding = () => {
	const { t } = useLanguage();
	const o = t.onboarding;
	const flow = useOnboardingFlow();
	const overlayRef = useRef<HTMLDivElement>(null);

	// Move focus to the step's primary action for keyboard users. The intention
	// step is skipped on purpose: focus stays on the real Timer's input field.
	useEffect(() => {
		if (flow.step === "intention") return;
		overlayRef.current?.querySelector("button")?.focus();
	}, [flow.step]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (!flow.isCoach && event.key === "Escape") {
				event.preventDefault();
				flow.skip();
			}
		},
		[flow.isCoach, flow.skip],
	);

	const variantClass = flow.isBlocking
		? styles.overlayBlocking
		: flow.isSpotlight
			? styles.overlaySpotlight
			: styles.overlayCoach;
	const overlayClass = `${styles.overlay} ${variantClass} ${
		flow.isIntention ? styles.overlayCoachTop : ""
	}`;

	const ariaLabel = formatMessage(o.stepLabel, {
		current: flow.stepIndex + 1,
		total: flow.totalSteps,
	});

	const shared = { steps: ONBOARDING_STEPS, activeStep: flow.step } as const;

	const spotlight = flow.isSpotlight
		? (SPOTLIGHT_FLOW.find((entry) => entry.step === flow.step) ?? null)
		: null;

	const spotlightNext = spotlight?.next ?? null;
	const handleSpotlightInteract = useCallback(() => {
		if (spotlightNext) {
			flow.goTo(spotlightNext);
		} else {
			flow.skip();
		}
	}, [spotlightNext, flow.goTo, flow.skip]);

	return (
		<div
			ref={overlayRef}
			className={overlayClass}
			role={flow.isCoach ? "status" : "dialog"}
			aria-modal={flow.isCoach ? undefined : true}
			aria-label={ariaLabel}
			onKeyDown={handleKeyDown}
		>
			{flow.isIntention && <div className={styles.intentionGlow} aria-hidden />}

			{flow.step === "welcome" && (
				<OnboardingCard
					{...shared}
					eyebrow={o.welcome.eyebrow}
					title={o.welcome.title}
					body={o.welcome.body}
					highlight={o.welcome.highlight}
					skipLabel={o.skip}
					onSkip={flow.skip}
				>
					<div className={styles.actions}>
						<Button
							color="red"
							variant="light"
							size="md"
							radius="md"
							onClick={() => flow.goTo("rhythm")}
						>
							{o.welcome.cta}
						</Button>
					</div>
				</OnboardingCard>
			)}

			{flow.step === "rhythm" && (
				<OnboardingCard
					{...shared}
					eyebrow={o.rhythm.eyebrow}
					title={o.rhythm.title}
					body={o.rhythm.body}
					highlight={o.rhythm.highlight}
					leadHighlight
					skipLabel={o.skip}
					onSkip={flow.skip}
				>
					<RhythmPicker onSelect={flow.selectRhythm} />
				</OnboardingCard>
			)}

			{flow.step === "intention" && (
				<OnboardingCard
					{...shared}
					coach
					eyebrow={o.intention.eyebrow}
					title={o.intention.title}
					body={o.intention.body}
					highlight={o.intention.highlight}
					skipLabel={o.skip}
					onSkip={flow.skip}
				/>
			)}

			{flow.step === "ring" && (
				<OnboardingCard
					{...shared}
					coach
					eyebrow={o.ring.eyebrow}
					title={o.ring.title}
					body={o.ring.body}
					highlight={o.ring.highlight}
				>
					<div className={styles.actions}>
						<Button
							color="red"
							variant="light"
							size="sm"
							radius="md"
							onClick={() => flow.goTo("settings")}
						>
							{o.next}
						</Button>
					</div>
				</OnboardingCard>
			)}

			{spotlight && (
				<SpotlightStep
					{...shared}
					anchor={spotlight.anchor}
					eyebrow={o[spotlight.step].eyebrow}
					title={o[spotlight.step].title}
					body={o[spotlight.step].body}
					highlight={o[spotlight.step].highlight}
					hintLabel={o.tryIt}
					onInteract={handleSpotlightInteract}
					skipLabel={o.skip}
					onSkip={flow.skip}
				/>
			)}
		</div>
	);
};

export default memo(Onboarding);
