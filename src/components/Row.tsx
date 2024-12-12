import TextArea from './TextArea';
import useEval from '../hooks/useEval';
import Result from './Result';
import { useEffect, useState } from 'react';

function Row({ id, removeElement }: { id: number; removeElement: (id: number) => void }) {
  const [expression, result, mode, onChange, clearExpression, setMode] = useEval(id);
  const [opacity, setOpacity] = useState('0%');
  const [rotate, setRotate] = useState('-20px');
  const [maxHeight, setMaxHeight] = useState('999px');

  useEffect(() => {
    setOpacity('100%');
    setRotate('0px');
  }, []);

  const remove = () => {
    setOpacity('0%');
    setRotate('-20px');
    setMaxHeight('0px');
    setTimeout(() => {
      removeElement(id);
      clearExpression();
    }, 300);
  };

  return (
    <li
      className='rounded-lg shadow-lg transition-all duration-300 ease-in-out'
      style={{ opacity, maxHeight, translate: `0px ${rotate}` }}
    >
      <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-[7%_50%_40%]'>
        <div className='flex items-center justify-center gap-2 lg:block'>
          <button
            className='btn btn-warning btn-sm mb-2 mt-2 w-full max-w-[8em] rounded-md px-3 py-1'
            onClick={remove}
            data-testid='remove'
          >
            Remove
          </button>
          <select
            className='select select-sm w-full max-w-[8em]'
            value={mode}
            onChange={(e) => setMode(e.target.value as 'eval' | 'math')}
            data-testid='mode'
          >
            <option disabled>Mode</option>
            <option value='eval' defaultChecked>
              Eval
            </option>
            <option value='math'>Math</option>
          </select>
        </div>
        <hr className='opacity-10 lg:hidden' />
        <div className='mt-2 flex justify-center'>
          <TextArea expression={expression} onChange={onChange} />
        </div>

        <hr className='opacity-10 lg:hidden' />
        <div className='flex items-center justify-center'>
          <Result state={result.state} value={result.value} />
        </div>
      </div>
    </li>
  );
}

export default Row;
