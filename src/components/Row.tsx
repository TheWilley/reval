import TextArea from './TextArea';
import useEval from '../hooks/useEval';
import Result from './Result';
import { useEffect, useState } from 'react';

function Row({ id, removeElement }: { id: number; removeElement: (id: number) => void }) {
  const [expression, result, onChange] = useEval();
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
    }, 300);
  };

  return (
    <li
      className='rounded-lg shadow-md transition-all duration-300 ease-in-out'
      style={{ opacity, maxHeight, translate: `0px ${rotate}` }}
    >
      <div className='grid grid-cols-[10%_50%_40%] items-center gap-4 p-4'>
        <div className='flex flex-col items-center'>
          <div className='font-mono text-xl'>{id}</div>
          <button
            className='btn btn-sm btn-warning mt-2 rounded-md px-3 py-1'
            onClick={remove}
            data-testid='remove'
          >
            Remove
          </button>
        </div>

        <div className='flex justify-center'>
          <TextArea expression={expression} onChange={onChange} />
        </div>

        <div className='flex items-center justify-center'>
          <Result state={result.state} value={result.value} />
        </div>
      </div>
    </li>
  );
}

export default Row;
