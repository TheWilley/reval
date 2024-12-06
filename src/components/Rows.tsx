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
      <div className='overflow-x-hidden rounded-md bg-base-200 text-left transition-all'>
        <ul>
          {ids.map((id, index) => (
            <Row key={id} id={id} visibleId={index} removeElement={removeElement} />
          ))}
        </ul>
      </div>
      <div
        className='mb-5 mt-5 cursor-pointer opacity-70 hover:opacity-100'
        onClick={addElement}
      >
        {' '}
        Alt + Enter or click here to add row
      </div>
    </>
  );
}

export default Rows;
