import Sandbox from '@nyariv/sandboxjs';
import { evaluate as mathEvaluate } from 'mathjs';
import { Plugins } from '../types/types';

export const plugins: Plugins = {
  eval: {
    evaluate: (expression: string) => String(new Sandbox().compile(expression)({}).run()),
    name: 'Eval',
  },
  math: {
    evaluate: (expression: string) => mathEvaluate(expression),
    name: 'Math',
  },
};
