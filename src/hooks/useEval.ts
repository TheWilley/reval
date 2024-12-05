import { ChangeEvent, useEffect, useState } from 'react';
import { EvalObject } from '../types/types';
import { localStorageIdPrefix } from '../utils/localStorageKeys';

export default function useEval(id: number) {
  const [expression, setExpression] = useState<EvalObject['expression']>(() => {
    const savedExpression = localStorage.getItem(localStorageIdPrefix + id);
    return savedExpression || '';
  });

  const [result, setResult] = useState<EvalObject['result']>({
    state: 'neutral',
    value: 'please write an expression',
  });

  const evaluate = (expr: string): EvalObject['result'] => {
    try {
      const evalResult = eval(expr); // ⚠️ Ensure eval usage is intentional and safe.
      return { state: 'success', value: String(evalResult) };
    } catch (error) {
      return { state: 'error', value: String(error) };
    }
  };

  useEffect(() => {
    if (!expression) {
      setResult({
        state: 'neutral',
        value: 'please write an expression',
      });
    } else {
      setResult(evaluate(expression));
    }
  }, [expression]);

  useEffect(() => {
    localStorage.setItem(localStorageIdPrefix + id, expression);
  }, [expression, id]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExpression(e.target.value);
  };

  const clearExpression = () => {
    localStorage.setItem(localStorageIdPrefix + id, '');
  };

  return [expression, result, onChange, clearExpression] as const;
}
