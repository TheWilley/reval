import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PluginToggle from './SettingsPluginToggle';
import ClearExpressionsButton from './SettingsClearExpressionsButton';

function Settings() {
  return (
    <>
      <FontAwesomeIcon
        icon={faCog}
        onClick={() =>
          (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()
        }
        className='cursor-pointer opacity-70 hover:opacity-100'
      />
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box bg-base-300'>
          <h3 className='mb-4 text-lg font-bold'>Settings</h3>
          <div className='flex items-center justify-center rounded-lg border-2 border-base-100 p-5'>
            <div className='w-full'>
              <PluginToggle />
              <ClearExpressionsButton />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Settings;
