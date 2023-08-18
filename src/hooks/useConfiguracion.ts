import { ConfigurationState, useConfigState } from "@/stores";
import { lensPath, mergeAll, set } from "ramda";
import { useEffect, useState } from "react";
import { Configuration } from "../models";

export const useConfiguration = (configState: ConfigurationState) => {
	const { config, setConfiguration: setConfig, resetConfiguration: resetConfig } = configState;
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
		// rome-ignore lint: romelint/suspicious/noExplicitAny
		value: any,
	) => {
		setIsSettingsChanged(true);
		setTempConfig((prevConfig) => set(lensPath(path.split(".")), value, prevConfig));
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
