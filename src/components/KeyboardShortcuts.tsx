import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function KeyboardShortcuts() {
  return (
    <>
      <FontAwesomeIcon
        icon={faKeyboard}
        onClick={() =>
          (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()
        }
        className='cursor-pointer opacity-70 hover:opacity-100'
      />
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Keyboard Shortucts</h3>
          <ul className='p-3'>
            <li>
              <kbd className='kbd'>Alt + Enter</kbd> <span className='m-2'>-</span>{' '}
              <span> Add new item </span>
            </li>
          </ul>
          <div className='modal-action flex justify-center'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default KeyboardShortcuts;
