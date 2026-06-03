import type { FC } from "react";
import styles from "./RipplesCore.module.css";

interface RipplesCoreProps {
	isPlaying: boolean;
	isBreak: boolean;
}

const RipplesCore: FC<RipplesCoreProps> = ({ isPlaying, isBreak }) => {
	return (
		<div
			className={`${styles.wrapper} ${isBreak ? styles.breakMode : ""} ${isPlaying ? styles.playing : ""}`}
		>
			<svg
				viewBox="0 0 120 120"
				className={styles.svg}
				aria-hidden="true"
			>
				<path
					d="M60 15 Q85 30, 95 55 Q105 80, 75 100 Q50 115, 30 90 Q10 65, 25 40 Q40 15, 60 15"
					className={`${styles.line} ${styles.line1}`}
				/>
				<path
					d="M55 20 Q80 35, 90 58 Q100 82, 70 100 Q45 112, 28 85 Q12 60, 30 38 Q48 20, 55 20"
					className={`${styles.line} ${styles.line2}`}
				/>
				<path
					d="M62 18 Q88 32, 97 56 Q107 78, 78 98 Q52 113, 32 88 Q14 63, 27 42 Q42 18, 62 18"
					className={`${styles.line} ${styles.line3}`}
				/>
				<path
					d="M58 22 Q82 37, 92 60 Q98 80, 72 97 Q48 110, 30 83 Q15 58, 32 40 Q50 22, 58 22"
					className={`${styles.line} ${styles.line4}`}
				/>
			</svg>
		</div>
	);
};

export default RipplesCore;
