import { createContext, useContext, useState } from 'react';
import { plugins } from '../../plugins/plugins';

type Settings = {
  enabledPlugins: Record<string, boolean>;
};

const defaultSettings = {
  enabledPlugins: Object.keys(plugins).reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {} as Record<string, boolean>
  ),
};

const SettingsContext = createContext({} as { settings: Settings });
const SettingsUpdateContext = createContext(
  {} as {
    togglePlugin: (pluginKey: string) => void;
  }
);

export function useSettings() {
  return useContext(SettingsContext);
}

export function useUpdateSettings() {
  return useContext(SettingsUpdateContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);

  function togglePlugin(pluginKey: string) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      enabledPlugins: {
        ...prevSettings.enabledPlugins,
        [pluginKey]: !prevSettings.enabledPlugins[pluginKey],
      },
    }));
  }

  return (
    <SettingsContext.Provider value={{ settings }}>
      <SettingsUpdateContext.Provider value={{ togglePlugin }}>
        {children}
      </SettingsUpdateContext.Provider>
    </SettingsContext.Provider>
  );
}
