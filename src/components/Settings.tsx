import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSettings from '../hooks/useSettings';
import Dialog from './Dialog';

function Settings() {
  const [removeExpressions] = useSettings();

  return (
    <>
      <Dialog
        header='Settings'
        id='settings-modal'
        toggleElement={
          <FontAwesomeIcon
            icon={faCog}
            className='cursor-pointer opacity-70 hover:opacity-100'
          />
        }
      >
        <div className='flex items-center justify-center rounded-lg border-2 border-base-100 p-5'>
          <div className='tooltip w-full' data-tip='Removes all expressions from storage'>
            <button className='btn btn-warning btn-sm w-full' onClick={removeExpressions}>
              Remove Expressions
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Settings;
