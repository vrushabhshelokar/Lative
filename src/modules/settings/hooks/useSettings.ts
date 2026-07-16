import { useSettingsContext } from '../providers/SettingsProvider';

export const useSettings = () => {
  return useSettingsContext();
};
