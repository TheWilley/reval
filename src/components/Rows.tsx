import Row from './Row';

function Rows({
  ids,
  addElement,
  removeElement,
}: {
  ids: number[];
  addElement: () => void;
  removeElement: (id: number) => void;
}) {
  return (
    <>
      <div className='bg-base-200 rounded-md text-left transition-all'>
        <ul>
          {ids.map((id) => (
            <Row key={id} id={id} removeElement={removeElement} />
          ))}
        </ul>
      </div>
      <div
        className='mt-5 cursor-pointer opacity-70 hover:opacity-100'
        onClick={addElement}
      >
        {' '}
        Alt + Enter or click here to add row
      </div>
    </>
  );
}

export default Rows;
