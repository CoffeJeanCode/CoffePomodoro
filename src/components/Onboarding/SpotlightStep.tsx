import { type CSSProperties, memo, useEffect } from "react";
import OnboardingCard from "./OnboardingCard";
import type { OnboardingAnchor } from "./anchors";
import {
	dismissOnboardingAnchors,
	onboardingAnchorSelector,
} from "./anchors";
import styles from "./Onboarding.module.css";
import { useElementRect } from "./useElementRect";

const RING_PADDING = 8;
const CARD_GAP = 16;
const CARD_HALF_WIDTH = 170;
const VIEWPORT_MARGIN = 12;

/** Spark positions around the ring perimeter (% of ring box) + stagger delay. */
const SPARKS = [
	{ top: "0%", left: "15%", delay: "0s" },
	{ top: "-6%", left: "62%", delay: "0.45s" },
	{ top: "22%", left: "101%", delay: "0.2s" },
	{ top: "72%", left: "104%", delay: "0.6s" },
	{ top: "101%", left: "78%", delay: "0.1s" },
	{ top: "104%", left: "28%", delay: "0.5s" },
	{ top: "74%", left: "-5%", delay: "0.3s" },
	{ top: "26%", left: "-6%", delay: "0.7s" },
];

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

interface SpotlightStepProps {
	anchor: OnboardingAnchor;
	eyebrow: string;
	title: string;
	body?: string;
	highlight?: string;
	hintLabel: string;
	/** Fires when the user actually interacts with the highlighted element. */
	onInteract: () => void;
	skipLabel: string;
	onSkip: () => void;
	steps: readonly string[];
	activeStep: string;
}

/**
 * A coachmark that dynamically tracks a real UI element: draws a sparkling
 * highlight around the target and only advances once the user clicks it. Card
 * anchors above or below depending on space; falls back to centered if absent.
 */
const SpotlightStep = ({
	anchor,
	hintLabel,
	onInteract,
	...cardProps
}: SpotlightStepProps) => {
	const selector = onboardingAnchorSelector(anchor);
	const rect = useElementRect(selector);

	// Entering a new spotlight closes whatever the previous step opened, so the
	// next highlight is never buried under a lingering drawer/panel/modal.
	useEffect(() => {
		dismissOnboardingAnchors();
	}, [anchor]);

	// Gate progression on a real interaction with the highlighted element.
	useEffect(() => {
		const element = document.querySelector(selector);
		if (!element) return;
		element.addEventListener("click", onInteract);
		return () => element.removeEventListener("click", onInteract);
	}, [selector, onInteract]);

	const placeAbove = rect ? rect.top > window.innerHeight / 2 : false;

	const ringStyle: CSSProperties | undefined = rect
		? {
				top: rect.top - RING_PADDING,
				left: rect.left - RING_PADDING,
				width: rect.width + RING_PADDING * 2,
				height: rect.height + RING_PADDING * 2,
			}
		: undefined;

	const cardStyle: CSSProperties = rect
		? {
				left: clamp(
					rect.left + rect.width / 2,
					CARD_HALF_WIDTH + VIEWPORT_MARGIN,
					window.innerWidth - CARD_HALF_WIDTH - VIEWPORT_MARGIN,
				),
				top: placeAbove ? rect.top - CARD_GAP : rect.bottom + CARD_GAP,
				transform: `translate(-50%, ${placeAbove ? "-100%" : "0"})`,
			}
		: { left: "50%", top: "50%", transform: "translate(-50%, -50%)" };

	return (
		<>
			{ringStyle && (
				<div className={styles.spotlightRing} style={ringStyle} aria-hidden>
					{SPARKS.map((spark) => (
						<span
							key={`${spark.top}-${spark.left}`}
							className={styles.spark}
							style={{
								top: spark.top,
								left: spark.left,
								animationDelay: spark.delay,
							}}
						/>
					))}
				</div>
			)}
			<div className={styles.spotlightCard} style={cardStyle}>
				<OnboardingCard coach {...cardProps}>
					<p className={styles.spotlightHint}>{hintLabel}</p>
				</OnboardingCard>
			</div>
		</>
	);
};

export default memo(SpotlightStep);
