import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FileSaver({ onFileSave }: { onFileSave: () => void }) {
  return (
    <FontAwesomeIcon
      icon={faDownload}
      className='cursor-pointer opacity-70 hover:opacity-100'
      onClick={onFileSave}
    />
  );
}

export default FileSaver;
