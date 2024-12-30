import Sandbox from '@nyariv/sandboxjs';
import { evaluate as mathEvaluate } from 'mathjs';
import { Plugins } from '../types/types';

export const plugins: Plugins = {
  eval: {
    evaluate: (expression: string) => String(new Sandbox().compile(expression)({}).run()),
    name: 'Eval',
    placeholderText: 'Write a javascript expression here...',
  },
  math: {
    evaluate: (expression: string) => mathEvaluate(expression),
    name: 'Math',
    placeholderText: 'Write a math expression here...',
  },
};
