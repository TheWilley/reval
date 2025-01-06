import Sandbox from '@nyariv/sandboxjs';
import { evaluate as mathEvaluate } from 'mathjs';
import { Plugins } from '../types/types';
export const plugins: Plugins = {
  eval: {
    evaluate: (expression) => String(new Sandbox().compile(expression)({}).run()),
    name: 'Eval',
    placeholderText: 'Write a javascript expression here...',
  },
  math: {
    evaluate: (expression) => mathEvaluate(expression),
    name: 'Math',
    placeholderText: 'Write a math expression here...',
  },
  regexReplace: {
    evaluate: (expression, options) => {
      if (!options || !options.regex) {
        throw new Error('Regex option is required');
      }
      const regex = new RegExp(
        String(options.regex.value),
        String(options.flags.value) || 'g'
      );
      return expression.replace(regex, String(options.replacement.value) || '');
    },
    name: 'Regex Replace',
    placeholderText: 'Write text here...',
    options: {
      regex: {
        name: 'Regex',
        type: 'string',
        value: '',
      },
      replacement: {
        name: 'Replacement',
        type: 'string',
        value: '',
      },
      flags: {
        name: 'Regex Flags',
        type: 'string',
        value: '',
      },
    },
  },
};
