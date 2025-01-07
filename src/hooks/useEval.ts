import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { EvalResult, Expression, Plugin, PluginOption } from '../types/types';
import { localStorageExpressionsArray } from '../utils/localStorageKeys';
import usePrevious from './usePrevious';

export default function useEval(id: number, availablePlugins: Record<string, Plugin>) {
  const [expression, setExpression] = useState<string>(() => initializeExpression(id));
  const [result, setResult] = useState<EvalResult>(defaultResult);
  const [mode, setMode] = useState<keyof typeof availablePlugins>(() =>
    initializeMode(id, availablePlugins)
  );
  const placeholder = useMemo(
    () => availablePlugins[mode].placeholderText,
    [availablePlugins, mode]
  );
  const currentPlugin = useMemo(() => availablePlugins[mode], [availablePlugins, mode]);
  const [pluginOptions, setPluginOptions] = useState(
    initializePluginOptions(id, currentPlugin.options)
  );
  const previousPluginName = usePrevious(currentPlugin.name);

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
        const evaluation = plugin.evaluate(expr, pluginOptions);
        return { state: 'success', value: String(evaluation) };
      } catch (error) {
        return { state: 'error', value: String((error as Error).message) };
      }
    },
    [availablePlugins, mode, pluginOptions]
  );

  useEffect(() => {
    setResult(expression ? evaluate(expression) : defaultResult);
  }, [evaluate, expression]);

  useEffect(() => {
    updateLocalStorage(id, expression, mode, pluginOptions);
  }, [expression, mode, id, pluginOptions]);

  useEffect(() => {
    if (
      currentPlugin.options == undefined ||
      (currentPlugin.name !== previousPluginName && previousPluginName !== undefined)
    )
      setPluginOptions(currentPlugin.options);
  }, [currentPlugin.name, currentPlugin.options, previousPluginName]);

  const OnChangeExpression = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExpression(e.target.value);
  };

  const onChangePluginOptions = (key: string, value: string | boolean | number) => {
    setPluginOptions((prev = {}) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
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
    currentPlugin,
    pluginOptions,
    OnChangeExpression,
    clearExpression,
    onChangePluginOptions,
    setMode,
  };
}

const defaultResult: EvalResult = {
  state: 'neutral',
  value: 'please write an expression',
};

function findItem(id: number) {
  const savedExpressions = getSavedExpressions();
  const foundItem = savedExpressions.find((item) => Number(item.id) === id);
  return foundItem;
}

function getSavedExpressions(): Expression[] {
  return JSON.parse(localStorage.getItem(localStorageExpressionsArray) || '[]');
}

function initializeExpression(id: number): string {
  const foundItem = findItem(id);
  return foundItem ? foundItem.expression : '';
}

function initializeMode(
  id: number,
  availablePlugins: Record<string, Plugin>
): keyof typeof availablePlugins {
  const foundItem = findItem(id);
  return foundItem && availablePlugins[foundItem.mode] ? foundItem.mode : 'eval';
}

function initializePluginOptions(id: number, pluginOptions: PluginOption | undefined) {
  const foundItem = findItem(id);
  return foundItem?.pluginOptions ? foundItem.pluginOptions : pluginOptions;
}

function updateLocalStorage(
  id: number,
  expression: string,
  mode: string,
  pluginOptions: PluginOption | undefined
) {
  const savedExpressions = getSavedExpressions();
  const updatedExpressions = savedExpressions.some((item) => item.id === id)
    ? savedExpressions.map((item) =>
        item.id === id ? { ...item, expression, mode, pluginOptions } : item
      )
    : [...savedExpressions, { id, expression, mode, pluginOptions }];

  localStorage.setItem(localStorageExpressionsArray, JSON.stringify(updatedExpressions));
}

function removeLocalStorageExpression(id: number) {
  const savedExpressions = getSavedExpressions();
  const updatedExpressions = savedExpressions.filter((item) => item.id !== id);
  localStorage.setItem(localStorageExpressionsArray, JSON.stringify(updatedExpressions));
}
