import type { FC } from "react";
import styles from "./StardustCore.module.css";

interface StardustCoreProps {
	isPlaying: boolean;
	isBreak: boolean;
}

const StardustCore: FC<StardustCoreProps> = ({ isPlaying, isBreak }) => {
	return (
		<div
			className={`${styles.wrapper} ${isBreak ? styles.breakMode : ""} ${isPlaying ? styles.playing : ""}`}
		>
			<div className={styles.orbit}>
				{Array.from({ length: 14 }, (_, i) => (
					<div
						key={`dust-a-${i}`}
						className={`${styles.dot} ${styles.dotLavender}`}
						style={{
							"--i": i,
							"--total": 14,
							"--size": `${1 + (i % 3) * 0.5}px`,
							"--distance": `${28 + (i % 4) * 8}px`,
						} as React.CSSProperties}
					/>
				))}
				{Array.from({ length: 10 }, (_, i) => (
					<div
						key={`dust-b-${i}`}
						className={`${styles.dot} ${styles.dotOrange}`}
						style={{
							"--i": i + 7,
							"--total": 10,
							"--size": `${1 + (i % 2) * 0.6}px`,
							"--distance": `${20 + (i % 3) * 10}px`,
						} as React.CSSProperties}
					/>
				))}
			</div>
			<div className={styles.centerGlow} />
		</div>
	);
};

export default StardustCore;
