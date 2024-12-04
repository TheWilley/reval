import { ChangeEvent, useState } from 'react';
import { EvalObject } from '../types/types';

export default function useEval() {
  const [expression, setExpression] = useState<EvalObject['expression']>();
  const [result, setResult] = useState<EvalObject['result']>({
    state: 'neutral',
    value: 'please write an expression',
  });

  const evaluate = (expression: string) => {
    try {
      const result = eval(expression);

      return { state: 'success', value: String(result) } as EvalObject['result'];
    } catch (e) {
      return { state: 'error', value: String(e) } as EvalObject['result'];
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExpression(e.target.value);
    setResult(evaluate(e.target.value));
  };

  return [expression, result, onChange] as const;
}
