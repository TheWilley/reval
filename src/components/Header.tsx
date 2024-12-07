import useSaveLoad from '../hooks/useSaveLoad';
import FileLoader from './FileLoader';
import FileSaver from './FileSaver';
import Settings from './Settings';

function Header() {
  const [save, load] = useSaveLoad();

  return (
    <>
      <h1 className='mb-2 mt-3 text-center text-xl font-bold'> reval </h1>
      <span className='text-gray-200'></span>
      <div className='mb-2 flex justify-center gap-3'>
        <Settings />
        <FileSaver onFileSave={save} />
        <FileLoader onFileLoad={load} />
      </div>
    </>
  );
}

export default Header;
