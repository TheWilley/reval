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
        placeholderText: 'Type a regex pattern',
      },
      replacement: {
        name: 'Replacement',
        type: 'string',
        value: '',
        placeholderText: 'Type the text to replace the regex pattern',
      },
      flags: {
        name: 'Regex Flags',
        type: 'string',
        value: '',
        placeholderText: 'Type a regex flag here',
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
  wordCounter: {
    evaluate: (expression) => {
      const wordCount = expression.trim().split(/\s+/).length;
      return `Word Count: ${wordCount}`;
    },
    name: 'Word Counter',
    placeholderText: 'Write text here...',
  },
  caesarCipher: {
    evaluate: (expression, options) => {
      if (!options) return '';
      const shift = parseInt(String(options.shift.value), 10) || 0;
      return expression
        .split('')
        .map((char) => {
          if (char.match(/[a-z]/i)) {
            const charCode = char.charCodeAt(0);
            const base = charCode >= 65 && charCode <= 90 ? 65 : 97;
            return String.fromCharCode(((charCode - base + shift) % 26) + base);
          }
          return char;
        })
        .join('');
    },
    name: 'Caesar Cipher',
    placeholderText: 'Enter text to encode...',
    options: {
      shift: {
        name: 'Shift',
        type: 'number',
        value: 1,
        placeholderText: 'Enter shift value...',
      },
    },
  },
  base64Encoder: {
    evaluate: (expression) => {
      try {
        return btoa(expression);
      } catch (err) {
        return 'Invalid input for Base64 encoding';
      }
    },
    name: 'Base64 Encoder',
    placeholderText: 'Enter text to encode in Base64...',
  },
  base64Decoder: {
    evaluate: (expression) => {
      try {
        return atob(expression);
      } catch (err) {
        return 'Invalid Base64 string';
      }
    },
    name: 'Base64 Decoder',
    placeholderText: 'Enter Base64 string to decode...',
  },
} as Plugins;
