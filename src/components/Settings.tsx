import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <div className='modal-box'>
          <h3 className='mb-4 text-lg font-bold'>Settings</h3>
          <div>Settings here...</div>
          <div className='modal-action flex justify-center'>
            <form method='dialog'>
              <button className='btn'>Save</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Settings;
