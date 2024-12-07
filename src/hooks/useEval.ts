import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { EvalObject, LocalStorageExpressionsArray } from '../types/types';
import { localStorageExpressionsArray } from '../utils/localStorageKeys';
import { evaluate as math } from 'mathjs';

export default function useEval(id: number) {
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

  const [mode, setMode] = useState<'eval' | 'math'>('eval');

  const evaluate = useCallback(
    (expr: string): EvalObject['result'] => {
      if (mode === 'eval') {
        try {
          const evalResult = eval?.(`"use strict";(${expr})`);
          return { state: 'success', value: String(evalResult) };
        } catch (error) {
          return { state: 'error', value: String(error) };
        }
      } else if (mode === 'math') {
        try {
          const mathResult = math(expr);
          return { state: 'success', value: String(mathResult) };
        } catch (error) {
          return { state: 'error', value: String((error as Error).message) };
        }
      } else {
        return { state: 'neutral', value: '' };
      }
    },
    [mode]
  );

  useEffect(() => {
    if (!expression) {
      setResult({
        state: 'neutral',
        value: 'please write an expression',
      });
    } else {
      setResult(evaluate(expression));
    }
  }, [evaluate, expression, mode]);

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
    const existingExpressions: LocalStorageExpressionsArray = JSON.parse(
      localStorage.getItem(localStorageExpressionsArray) || '[]'
    );
    const updatedExpressions =
      existingExpressions.some((item) => item.id === id) &&
      existingExpressions.map((item) =>
        item.id === id ? { ...item, expression: '' } : item
      );

    localStorage.setItem(
      localStorageExpressionsArray,
      JSON.stringify(updatedExpressions)
    );
  };

  return [expression, result, mode, onChange, clearExpression, setMode] as const;
}
