import { type ReactNode, memo } from "react";
import StepDots from "./StepDots";
import styles from "./Onboarding.module.css";

interface OnboardingCardProps {
	eyebrow: string;
	title: string;
	body?: string;
	highlight?: string;
	/** Render the highlight before the body (used to lead with a call to action). */
	leadHighlight?: boolean;
	/** Compact, non-blocking coachmark variant. */
	coach?: boolean;
	steps: readonly string[];
	activeStep: string;
	skipLabel?: string;
	onSkip?: () => void;
	children?: ReactNode;
}

/**
 * Shared presentational shell for every ritual step: header, copy block,
 * step-specific content, optional skip, and progress dots. Holds no state.
 */
const OnboardingCard = ({
	eyebrow,
	title,
	body,
	highlight,
	leadHighlight = false,
	coach = false,
	steps,
	activeStep,
	skipLabel,
	onSkip,
	children,
}: OnboardingCardProps) => {
	const bodyText = body ? <p className={styles.body}>{body}</p> : null;
	const highlightText = highlight ? (
		<p className={styles.highlight}>{highlight}</p>
	) : null;

	return (
		<section className={`${styles.card} ${coach ? styles.cardCoach : ""}`}>
			<span className={styles.eyebrow}>{eyebrow}</span>
			<h2 className={`${styles.title} ${coach ? styles.titleCoach : ""}`}>
				{title}
			</h2>

			{leadHighlight ? (
				<>
					{highlightText}
					{bodyText}
				</>
			) : (
				<>
					{bodyText}
					{highlightText}
				</>
			)}

			{children}

			{onSkip && skipLabel ? (
				<button type="button" className={styles.skip} onClick={onSkip}>
					{skipLabel}
				</button>
			) : null}

			<StepDots steps={steps} activeStep={activeStep} />
		</section>
	);
};

export default memo(OnboardingCard);
