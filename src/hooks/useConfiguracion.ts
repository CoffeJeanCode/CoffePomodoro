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
	const [tempConfig, setTempConfig] = useState(config);

	useEffect(() => {
		setTempConfig(config);
	}, [config]);

	const isSettingsChanged = useMemo(
		() => !configurationEquals(tempConfig, config),
		[tempConfig, config],
	);

	const saveConfiguration = () => {
		setConfig(tempConfig);
	};

	const cancelConfiguration = () => {
		setTempConfig(config);
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
