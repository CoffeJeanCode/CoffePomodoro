import { useLanguage } from "@/context/LanguageContext";
import type { DepthPresetKey } from "@/models/depth";
import { memo } from "react";
import styles from "./Onboarding.module.css";

const RHYTHM_KEYS: DepthPresetKey[] = ["deep", "sustained", "quick"];

interface RhythmPickerProps {
	onSelect: (key: DepthPresetKey) => void;
}

const RhythmPicker = ({ onSelect }: RhythmPickerProps) => {
	const { t } = useLanguage();
	const presets = t.onboarding.rhythm.presets;

	return (
		<div className={styles.presetList}>
			{RHYTHM_KEYS.map((key) => {
				const preset = presets[key];
				return (
					<button
						key={key}
						type="button"
						className={styles.presetBtn}
						onClick={() => onSelect(key)}
					>
						<span className={styles.presetText}>
							<span className={styles.presetLabel}>{preset.label}</span>
							<span className={styles.presetDesc}>{preset.desc}</span>
						</span>
						<span className={styles.presetMeta}>{preset.meta}</span>
					</button>
				);
			})}
		</div>
	);
};

export default memo(RhythmPicker);
