import { lensPath, set } from "ramda";
import { useRecoilState } from "recoil";
import { timersConfig } from "../../state";

export const useSettings = () => {
  const [config, setConfig] = useRecoilState(timersConfig);

  const setConfigValue = (type: string, value: any) => {
    const pathType = lensPath(type.split("."));
    const newConfig = set(pathType, value, config);
    setConfig(newConfig);
  };

  return { config, setConfigValue };
};
