import { memo } from "react";
import styles from "./Onboarding.module.css";

interface StepDotsProps {
	steps: readonly string[];
	activeStep: string;
}

const StepDots = ({ steps, activeStep }: StepDotsProps) => (
	<div className={styles.dots} aria-hidden>
		{steps.map((step) => (
			<span
				key={step}
				className={`${styles.dot} ${step === activeStep ? styles.dotActive : ""}`}
			/>
		))}
	</div>
);

export default memo(StepDots);
