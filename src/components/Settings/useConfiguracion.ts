import { lensPath, mergeAll, set } from "ramda";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { config } from "../../state";

export const useConfiguration = () => {
  const [configuration, setConfiguration] = useRecoilState(config);
  const [tempConfiguration, setTempConfiguration] = useState(configuration);
  const [isSettingsChanged, setIsSettingsChanged] = useState(false);
  const resetConfig = useResetRecoilState(config);

  useEffect(() => {
    setTempConfiguration(configuration);
  }, [configuration]);

  const updateConfiguration = (changes: object) => {
    setIsSettingsChanged(true);
    setTempConfiguration((prevConfig: any) => mergeAll([prevConfig, changes]));
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

  const setConfigValue = (path: string, value: any) => {
    setIsSettingsChanged(true);
    setTempConfiguration((prevConfig: any) =>
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
