import { useState } from 'react';
import { EvalResult } from '../types/types';
import DOMPurify from 'dompurify';

// Helper function to determine the color based on result state
const getColorFromState = (state: EvalResult['state']) => {
  if (state === 'error') {
    return 'text-red-500';
  } else if (state === 'neutral') {
    return 'text-yellow-500';
  } else {
    return 'text-green-500';
  }
};

function Result({ value, state }: { value: string; state: EvalResult['state'] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedValue =
    value.length > 200 && !isExpanded ? `${value.slice(0, 160)}...` : value;

  return (
    <div className='h-full w-full gap-2'>
      <div
        className={`mt-2 overflow-hidden whitespace-pre-wrap break-words rounded-lg border-2 border-base-100 p-6 ${getColorFromState(state)}`}
        style={{ maxHeight: isExpanded ? 'none' : '10rem' }}
        data-testid='result'
      >
        <div
          className='text-center'
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedValue) }}
        />
      </div>
      {value.length > 200 && (
        <button
          className='btn btn-sm mt-2 w-full bg-base-100 text-blue-500'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}

export default Result;
