import { useConfigState } from "@/stores";
import { lensPath, mergeAll, set } from "ramda";
import { useEffect, useState } from "react";
import { Configuration } from "../models";

export const useConfiguration = () => {
  const {
    config,
    setConfiguration: setConfig,
    resetConfiguration: resetConfig,
  } = useConfigState();
  const [tempConfig, setTempConfig] = useState(config);
  const [isSettingsChanged, setIsSettingsChanged] = useState(false);

  useEffect(() => {
    setTempConfig(config);
  }, [config]);

  const updateConfiguration = (changes: Configuration) => {
    setIsSettingsChanged(true);
    setTempConfig((prevConfig) => mergeAll([prevConfig, changes]));
  };

  const saveConfiguration = () => {
    setIsSettingsChanged(false);
    setConfig(tempConfig);
  };

  const resetConfiguration = () => {
    if (resetConfig) resetConfig();
    setIsSettingsChanged(false);
    setTempConfig(config);
  };
  const setConfigValue = (
    path: string,
    // rome-ignore lint: romelint/suspicious/noExplicitAny
    value: any
  ) => {
    setIsSettingsChanged(true);
    setTempConfig((prevConfig) =>
      set(lensPath(path.split(".")), value, prevConfig)
    );
  };

  return {
    config: tempConfig,
    isSettingsChanged,
    updateConfiguration,
    saveConfiguration,
    resetConfiguration,
    setConfigValue,
  };
};
