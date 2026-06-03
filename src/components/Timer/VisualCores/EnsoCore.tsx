import type { FC } from "react";
import styles from "./EnsoCore.module.css";

interface EnsoCoreProps {
	isPlaying: boolean;
	isBreak: boolean;
}

const EnsoCore: FC<EnsoCoreProps> = ({ isPlaying, isBreak }) => {
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
					d="M60 18 C82 18, 102 35, 102 58 C102 82, 84 102, 60 102 C36 102, 18 82, 18 58 C18 38, 32 20, 55 18"
					className={styles.circlePath}
					fill="none"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
};

export default EnsoCore;
