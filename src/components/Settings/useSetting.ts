import { lensPath, set } from "ramda";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { alarmSelector, timersConfig } from "../../state";

export const useSettings = () => {
  const [config, setConfig] = useRecoilState(timersConfig);
  const [tempConfig, setTempConfig] = useState(config);
  const [isSettingsChanged, setIsSettingsChanged] = useState(false);
  const [alarm, setAlarm] = useRecoilState(alarmSelector);

  const isSetting =
    (fn: Function) =>
    (...params: any) => {
      setIsSettingsChanged(true);
      fn(...params);
    };

  const setConfigValue = isSetting((type: string, value: any) => {
    const pathType = lensPath(type.split("."));
    const newConfig = set(pathType, value, config);
    setTempConfig(newConfig);
  });

  const handleAlarm = isSetting((newAlarm: string) => {
    setAlarm(newAlarm);
  });

  const handleSaveConfig = () => {
    setIsSettingsChanged(false);
    setConfig(tempConfig);
  };

  return {
    config: tempConfig,
    isSettingsChanged,
    alarm,
    handleAlarm,
    setConfigValue,
    handleSaveConfig,
  };
};
