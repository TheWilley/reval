import { useCallback, useEffect, useMemo, useState } from 'react';
import { EvalResult, Expression, Plugin, PluginOption } from '../types/types';
import { localStorageExpressionsArray } from '../utils/localStorageKeys';
import usePrevious from './usePrevious';
import { ContentEditableEvent } from 'react-contenteditable';
import DOMPurify from 'dompurify';

export default function useEval(id: number, availablePlugins: Record<string, Plugin>) {
  const [html, setHtml] = useState<string>(() => initializeExpression(id));
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<EvalResult>(defaultResult);
  const [mode, setMode] = useState<keyof typeof availablePlugins>(() =>
    initializeMode(id, availablePlugins)
  );
  const currentPlugin = useMemo(() => availablePlugins[mode], [availablePlugins, mode]);
  const placeholder = useMemo(
    () => currentPlugin.placeholderText,
    [currentPlugin.placeholderText]
  );
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
        const evaluation = currentPlugin.evaluate(expr, pluginOptions);
        return { state: 'success', value: String(evaluation) };
      } catch (error) {
        return { state: 'error', value: String((error as Error).message) };
      }
    },
    [currentPlugin, pluginOptions]
  );

  useEffect(() => {
    setResult(expression ? evaluate(expression) : defaultResult);
  }, [evaluate, expression]);

  useEffect(() => {
    updateLocalStorage(id, html, mode, pluginOptions);
    setExpression(extractContent(html));
  }, [html, mode, id, pluginOptions]);

  useEffect(() => {
    if (
      currentPlugin.options == undefined ||
      (currentPlugin.name !== previousPluginName && previousPluginName !== undefined)
    )
      setPluginOptions(currentPlugin.options);
  }, [currentPlugin.name, currentPlugin.options, previousPluginName]);

  const OnChangeExpression = (e: ContentEditableEvent) => {
    // Clean attributes as we don't want to paste or type html with styles or scripts
    const value: string = DOMPurify.sanitize(e.target.value, {
      ALLOWED_ATTR: [''],
    });

    // Weird bug where a <br> tag will be added if content is set to empty, thus we need to remove it
    // as placeholder otherwise won't show up
    if (value === '<br>') {
      setHtml('');
    } else {
      setHtml(value);
    }
  };

  const onChangePluginOptions = (key: string, value: string | boolean | number) => {
    setPluginOptions((prev = {}) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const clearExpression = () => {
    setHtml('');
    removeLocalStorageExpression(id);
  };

  return {
    html,
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

function extractContent(html: string) {
  return (
    new DOMParser().parseFromString(html, 'text/html').documentElement.textContent || ''
  );
}

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
