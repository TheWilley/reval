import { EvalObject } from '../types/types';

// Helper function to determine the color based on result state
const getColorFromState = (state: EvalObject['result']['state']) => {
  if (state === 'error') {
    return 'red';
  } else if (state === 'neutral') {
    return '#F6BE00';
  } else {
    return 'green';
  }
};

function Result({
  value,
  state,
}: {
  value: string;
  state: EvalObject['result']['state'];
}) {
  return (
    <span
      className='break-words'
      style={{ color: getColorFromState(state) }}
      data-testid='result'
    >
      {value}
    </span>
  );
}

export default Result;
