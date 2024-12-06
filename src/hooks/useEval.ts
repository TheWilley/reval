import { ChangeEvent, useEffect, useState } from 'react';
import { EvalObject, LocalStorageExpressionsArray, SaveFile } from '../types/types';
import { localStorageExpressionsArray } from '../utils/localStorageKeys';

export default function useEval(id: number, load: (savefile: SaveFile) => void) {
  const [expression, setExpression] = useState<EvalObject['expression']>(() => {
    const savedExpression = localStorage.getItem(localStorageExpressionsArray);

    if (savedExpression) {
      const expressions: Array<{ id: string; expression: EvalObject['expression'] }> =
        JSON.parse(savedExpression);

      const foundItem = expressions.find((item) => Number(item.id) === id);
      return foundItem ? foundItem.expression : '';
    }

    return '';
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
    const existingExpressions: LocalStorageExpressionsArray = JSON.parse(
      localStorage.getItem(localStorageExpressionsArray) || '[]'
    );
    const newExpression = { id, expression };
    const updatedExpressions = existingExpressions.some((item) => item.id === id)
      ? existingExpressions.map((item) =>
          item.id === id ? { ...item, expression } : item
        )
      : [...existingExpressions, newExpression];

    localStorage.setItem(
      localStorageExpressionsArray,
      JSON.stringify(updatedExpressions)
    );
  }, [expression, id]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExpression(e.target.value);
  };

  const clearExpression = () => {
    localStorage.setItem(localStorageExpressionsArray + id, '');
  };

  return [expression, result, onChange, clearExpression] as const;
}
