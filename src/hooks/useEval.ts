import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { EvalResult, Expression } from '../types/types';
import { localStorageExpressionsArray } from '../utils/localStorageKeys';
import { evaluate as math } from 'mathjs';

export default function useEval(id: number) {
  // State initialization
  const [expression, setExpression] = useState<Expression['expression']>(() =>
    initializeExpression(id)
  );
  const [result, setResult] = useState<EvalResult>(defaultResult);
  const [mode, setMode] = useState<'eval' | 'math'>(() => initializeMode(id));

  // Evaluate the expression based on the current mode
  const evaluate = useCallback(
    (expr: string): EvalResult => {
      try {
        const evaluation = mode === 'eval' ? eval(`"use strict";(${expr})`) : math(expr);
        return { state: 'success', value: String(evaluation) };
      } catch (error) {
        return { state: 'error', value: String((error as Error).message) };
      }
    },
    [mode]
  );

  // Update the result whenever the expression or mode changes
  useEffect(() => {
    setResult(expression ? evaluate(expression) : defaultResult);
  }, [evaluate, expression]);

  // Persist changes to expression and mode in localStorage
  useEffect(() => {
    updateLocalStorage(id, expression, mode);
  }, [expression, mode, id]);

  // Handlers for UI interactions
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExpression(e.target.value);
  };

  const clearExpression = () => {
    setExpression('');
    updateLocalStorage(id, '', mode);
  };

  return [expression, result, mode, onChange, clearExpression, setMode] as const;
}

// Helper functions
const defaultResult: EvalResult = {
  state: 'neutral',
  value: 'please write an expression',
};

function initializeExpression(id: number): Expression['expression'] {
  const savedExpressions = getSavedExpressions();
  const foundItem = savedExpressions.find((item) => Number(item.id) === id);
  return foundItem ? foundItem.expression : '';
}

function initializeMode(id: number): 'eval' | 'math' {
  const savedExpressions = getSavedExpressions();
  const foundItem = savedExpressions.find((item) => Number(item.id) === id);
  return foundItem ? foundItem.mode : 'eval';
}

function getSavedExpressions(): Expression[] {
  return JSON.parse(localStorage.getItem(localStorageExpressionsArray) || '[]');
}

function updateLocalStorage(
  id: number,
  expression: Expression['expression'],
  mode: 'eval' | 'math'
) {
  const savedExpressions = getSavedExpressions();
  const updatedExpressions = savedExpressions.some((item) => item.id === id)
    ? savedExpressions.map((item) =>
        item.id === id ? { ...item, expression, mode } : item
      )
    : [...savedExpressions, { id, expression, mode }];

  localStorage.setItem(localStorageExpressionsArray, JSON.stringify(updatedExpressions));
}
