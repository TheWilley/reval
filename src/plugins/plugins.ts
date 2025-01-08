import Sandbox from '@nyariv/sandboxjs';
import { evaluate as mathEvaluate } from 'mathjs';
import { Plugins } from '../types/types';
export default {
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
      if (!options) return '';

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
  textModifier: {
    evaluate: (expression, options) => {
      if (!options) return '';

      if (options.modifier.value === 'Reverse') {
        return expression.split('').reverse().join('');
      } else if (options.modifier.value === 'Uppercase') {
        return expression.toUpperCase();
      } else if (options.modifier.value === 'Lowercase') {
        return expression.toLocaleLowerCase();
      }
    },
    name: 'Text Modifier',
    placeholderText: 'Write text here...',
    options: {
      modifier: {
        name: 'Modifier',
        type: 'select',
        value: 'Reverse',
        options: ['Reverse', 'Uppercase', 'Lowercase'],
      },
    },
  },
} as Plugins;
