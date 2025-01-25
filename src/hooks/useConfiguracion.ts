import type { ConfigurationState } from "@/stores";
import { lensPath, set } from "ramda";
import { useEffect, useState } from "react";

export const useConfiguration = (configState: ConfigurationState) => {
	const {
		config,
		setConfiguration: setConfig,
		resetConfiguration: resetConfig,
	} = configState;
	const [tempConfig, setTempConfig] = useState(config);
	const [isSettingsChanged, setIsSettingsChanged] = useState(false);

	useEffect(() => {
		setTempConfig(config);
	}, [config]);

	const saveConfiguration = () => {
		setIsSettingsChanged(false);
		setConfig(tempConfig);
	};

	const cancelConfiguration = () => {
		setIsSettingsChanged(false);
		setConfig(config);
	};

	const resetConfiguration = () => {
		if (resetConfig) resetConfig();
		setIsSettingsChanged(false);
		setTempConfig(config);
	};
	const setConfigValue = (
		path: string,
		// biome-ignore lint: romelint/suspicious/noExplicitAny
		value: any,
	) => {
		setIsSettingsChanged(true);
		setTempConfig((prevConfig) =>
			set(lensPath(path.split(".")), value, prevConfig),
		);
	};

	return {
		config: tempConfig,
		isSettingsChanged,
		saveConfiguration,
		cancelConfiguration,
		resetConfiguration,
		setConfigValue,
	};
};
