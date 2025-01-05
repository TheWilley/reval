import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSettings from '../hooks/useSettings';

function Settings() {
  const [removeExpressions] = useSettings();

  return (
    <>
      <FontAwesomeIcon
        icon={faCog}
        onClick={() =>
          (document.getElementById('settings_modal') as HTMLDialogElement).showModal()
        }
        className='cursor-pointer opacity-70 hover:opacity-100'
      />
      <dialog id='settings_modal' className='modal'>
        <div className='modal-box bg-base-300'>
          <h3 className='mb-4 text-lg font-bold'>Settings</h3>
          <div className='flex items-center justify-center rounded-lg border-2 border-base-100 p-5'>
            <div
              className='tooltip w-full'
              data-tip='Removes all expressions from storage'
            >
              <button
                className='btn btn-warning btn-sm w-full'
                onClick={removeExpressions}
              >
                Remove Expressions
              </button>
            </div>
          </div>
          <div className='modal-action flex justify-center'>
            <form method='dialog'>
              <button className='btn'>Done</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Settings;
