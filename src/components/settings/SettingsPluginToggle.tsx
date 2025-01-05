import { useSettings, useUpdateSettings } from './SettingsContext';
import SettingsSection from './SettingsSection';

function PluginToggle() {
  const { settings } = useSettings();
  const { togglePlugin } = useUpdateSettings();
  const { enabledPlugins } = settings;

  return (
    <SettingsSection title='Plugins'>
      {Object.keys(enabledPlugins).map(
        (pluginKey, index) =>
          index !== 0 && (
            <div key={pluginKey} className='mb-2'>
              <label>
                <input
                  type='checkbox'
                  checked={enabledPlugins[pluginKey]}
                  onChange={() => togglePlugin(pluginKey)}
                  className='mr-2'
                />
                {pluginKey}
              </label>
            </div>
          )
      )}
    </SettingsSection>
  );
}

export default PluginToggle;
