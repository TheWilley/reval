import { faDownload, faKeyboard, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  return (
    <>
      <h1 className='mb-2 mt-3 text-center text-xl font-bold'> reval </h1>
      <span className='text-gray-200'></span>
      <div className='mb-2 flex justify-center gap-3'>
        <FontAwesomeIcon
          icon={faKeyboard}
          className='cursor-pointer opacity-70 hover:opacity-100'
        />
        <FontAwesomeIcon
          icon={faDownload}
          className='cursor-pointer opacity-70 hover:opacity-100'
        />
        <FontAwesomeIcon
          icon={faUpload}
          className='cursor-pointer opacity-70 hover:opacity-100'
        />
      </div>
    </>
  );
}

export default Header;
