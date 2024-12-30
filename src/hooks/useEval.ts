import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { EvalResult, Expression, Plugin } from '../types/types';
import { localStorageExpressionsArray } from '../utils/localStorageKeys';

export default function useEval(id: number, availablePlugins: Record<string, Plugin>) {
  const [expression, setExpression] = useState<Expression['expression']>(() =>
    initializeExpression(id)
  );
  const [result, setResult] = useState<EvalResult>(defaultResult);
  const [mode, setMode] = useState<keyof typeof availablePlugins>(() =>
    initializeMode(id, availablePlugins)
  );
  const placeholder = useMemo(
    () => availablePlugins[mode].placeholderText,
    [availablePlugins, mode]
  );

  const pluginList = useMemo(
    () =>
      Object.entries(availablePlugins).map(([key, plugin]) => ({
        key,
        name: plugin.name,
      })),
    [availablePlugins]
  );

  const evaluate = useCallback(
    (expr: string): EvalResult => {
      try {
        const plugin = availablePlugins[mode];
        if (!plugin) {
          throw new Error(`No plugin available for mode: ${mode}`);
        }
        const evaluation = plugin.evaluate(expr);
        return { state: 'success', value: String(evaluation) };
      } catch (error) {
        return { state: 'error', value: String((error as Error).message) };
      }
    },
    [mode, availablePlugins]
  );

  useEffect(() => {
    setResult(expression ? evaluate(expression) : defaultResult);
  }, [evaluate, expression]);

  useEffect(() => {
    updateLocalStorage(id, expression, mode);
  }, [expression, mode, id]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExpression(e.target.value);
  };

  const clearExpression = () => {
    setExpression('');
    removeLocalStorageExpression(id);
  };

  return {
    expression,
    result,
    mode,
    placeholder,
    pluginList,
    onChange,
    clearExpression,
    setMode,
  };
}

const defaultResult: EvalResult = {
  state: 'neutral',
  value: 'please write an expression',
};

function initializeExpression(id: number): Expression['expression'] {
  const savedExpressions = getSavedExpressions();
  const foundItem = savedExpressions.find((item) => Number(item.id) === id);
  return foundItem ? foundItem.expression : '';
}

function initializeMode(
  id: number,
  availablePlugins: Record<string, Plugin>
): keyof typeof availablePlugins {
  const savedExpressions = getSavedExpressions();
  const foundItem = savedExpressions.find((item) => Number(item.id) === id);
  return foundItem && availablePlugins[foundItem.mode] ? foundItem.mode : 'eval';
}

function getSavedExpressions(): Expression[] {
  return JSON.parse(localStorage.getItem(localStorageExpressionsArray) || '[]');
}

function updateLocalStorage(
  id: number,
  expression: Expression['expression'],
  mode: string
) {
  const savedExpressions = getSavedExpressions();
  const updatedExpressions = savedExpressions.some((item) => item.id === id)
    ? savedExpressions.map((item) =>
        item.id === id ? { ...item, expression, mode } : item
      )
    : [...savedExpressions, { id, expression, mode }];

  localStorage.setItem(localStorageExpressionsArray, JSON.stringify(updatedExpressions));
}

function removeLocalStorageExpression(id: number) {
  const savedExpressions = getSavedExpressions();
  const updatedExpressions = savedExpressions.filter((item) => item.id !== id);
  localStorage.setItem(localStorageExpressionsArray, JSON.stringify(updatedExpressions));
}
