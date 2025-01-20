import addVariablesToTailwindClass from '../helpers/addVariablesToTailwindClass';
import { EvalResult } from '../types/types';

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
  return (
    <div className='h-full w-full gap-2'>
      <div
        className={addVariablesToTailwindClass(
          'mt-2 overflow-hidden whitespace-pre-wrap break-words rounded-lg border-2 border-base-100 p-6',
          getColorFromState(state)
        )}
        data-testid='result'
      >
        <div className='text-center'>{value}</div>
      </div>
    </div>
  );
}

export default Result;
