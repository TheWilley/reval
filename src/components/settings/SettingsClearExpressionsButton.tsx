import useLocalStorageHandler from '../../hooks/useLocalStorageHandler';

function ClearExpressionsButton() {
  const [removeExpressions] = useLocalStorageHandler();

  return (
    <div className='tooltip w-full' data-tip='Removes all expressions from storage'>
      <button className='btn btn-warning btn-sm w-full' onClick={removeExpressions}>
        Clear All Expressions
      </button>
    </div>
  );
}

export default ClearExpressionsButton;
