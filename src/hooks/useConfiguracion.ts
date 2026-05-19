import type { ConfigurationState } from "@/stores";
import { configurationEquals } from "@/utils/configurationEquals";
import { lensPath, set } from "ramda";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useConfiguration = (configState: ConfigurationState) => {
	const {
		config,
		setConfiguration: setConfig,
		resetConfiguration: resetConfig,
	} = configState;
	const [snapshot, setSnapshot] = useState(config);
	const [tempConfig, setTempConfig] = useState(config);

	useEffect(() => {
		setTempConfig(config);
		setSnapshot(config);
	}, [config]);

	const isSettingsChanged = useMemo(
		() => !configurationEquals(tempConfig, snapshot),
		[tempConfig, snapshot],
	);

	const saveConfiguration = () => {
		setConfig(tempConfig);
		setSnapshot(tempConfig);
	};

	const cancelConfiguration = () => {
		setTempConfig(snapshot);
	};

	const resetConfiguration = () => {
		if (resetConfig) resetConfig();
	};

	const setConfigValue = useCallback(
		(
			path: string,
			// biome-ignore lint: romelint/suspicious/noExplicitAny
			value: any,
		) => {
			setTempConfig((prevConfig) =>
				set(lensPath(path.split(".")), value, prevConfig),
			);
		},
		[],
	);

	return {
		config: tempConfig,
		isSettingsChanged,
		saveConfiguration,
		cancelConfiguration,
		resetConfiguration,
		setConfigValue,
	};
};
