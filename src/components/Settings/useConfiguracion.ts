import { lensPath, mergeAll, set } from "ramda";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { config } from "../../state";
import { Configuration } from "../../types";

export const useConfiguration = () => {
  const [configuration, setConfiguration] = useRecoilState(config);
  const [tempConfiguration, setTempConfiguration] = useState(configuration);
  const [isSettingsChanged, setIsSettingsChanged] = useState(false);
  const resetConfig = useResetRecoilState(config);

  useEffect(() => {
    setTempConfiguration(configuration);
  }, [configuration]);

  // rome-ignore : romelint/suspicious/noExplicitAny
  const updateConfiguration = (changes: Configuration) => {
    setIsSettingsChanged(true);
    setTempConfiguration((prevConfig) => mergeAll([prevConfig, changes]));
  };

  const saveConfiguration = () => {
    setIsSettingsChanged(false);
    setConfiguration(tempConfiguration);
  };

  const resetConfiguration = () => {
    resetConfig();
    setIsSettingsChanged(false);
    setTempConfiguration(configuration);
  };
  const setConfigValue = (
    path: keyof typeof configuration | string,
    // rome-ignore lint: romelint/suspicious/noExplicitAny
    value: any
  ) => {
    setIsSettingsChanged(true);
    setTempConfiguration((prevConfig: Configuration) =>
      set(lensPath(path.split(".")), value, prevConfig)
    );
  };

  return {
    configuration: tempConfiguration,
    isSettingsChanged,
    updateConfiguration,
    saveConfiguration,
    resetConfiguration,
    setConfigValue
  };
};
