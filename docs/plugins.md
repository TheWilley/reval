# Creating a Plugin

To facilitate easy extensibility, a plugin system has been implemented where an object encapsulates the functionality of a given "mode." Such an object includes attributes such as the mode's name, placeholder text, evaluation method, and configuration options.

## Table of Contents

1. [Understanding the Plugin Structure](#understanding-the-plugin-structure)
2. [Defining Plugin Options](#defining-plugin-options)
3. [Implementing the Evaluate Function](#implementing-the-evaluate-function)
4. [Example: Regex Replace Plugin](#example-regex-replace-plugin)
5. [Registering the Plugin](#registering-the-plugin)

---

## Understanding the Plugin Structure

A plugin is an object that adheres to the `Plugin` type, which includes:

- **evaluate**: A function that processes an input expression based on provided options.
- **name**: A descriptive name for the plugin.
- **placeholderText** _(optional)_: Placeholder text.
- **hideResult** _(optional)_: Hides the result, effectively only displaying the expression textbox
- **options** _(optional)_: Configuration options that the plugin can accept.

## Defining Plugin Options

Options allow users to customize the behavior of the plugin. Each option is defined with the following properties:

- **name**: A user-friendly name for the option.
- **type**: The data type of the option (`'string' | 'boolean' | 'number' | 'select'`).
- **value**: The default value of the option.
- **placeholderText** _(optional)_: Placeholder text (only works for string and number inputs)
- **options** _(optional)_: The options to show when using the "select" type.

Options are structured using the `PluginOption` type, which is a record where each key corresponds to an option.

## Implementing the Evaluate Function

The `evaluate` function is the core of the plugin. It takes an input `expression` (a string) and an optional `options` object, then returns a transformed string based on the plugin's logic.

### Key Points:

- **Input Parameters**:
  - `expression`: The string to be processed.
  - `options`: Configuration options for the plugin.
- **Error Handling**: The function should handle cases where required options are missing or invalid.
- **Processing Logic**: Implement the transformation logic based on the plugin's purpose.

## Example: Regex Replace Plugin

Let's walk through creating a **Regex Replace** plugin that performs a regex-based search and replace on the input text.

### Plugin Definition

```javascript
const regexReplace = {
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
};
```

### Explanation

- **evaluate Function**:
  - **Validation**: Checks if the `regex` option is provided.
  - **Regex Construction**: Creates a `RegExp` object using the provided `regex` and `flags`. Defaults to the global flag `'g'` if none are provided.
  - **Replacement**: Uses `String.prototype.replace` to perform the replacement. If `replacement` is not provided, it defaults to an empty string.
- **Name & Placeholder**:

  - `name`: "Regex Replace" - Descriptive name for the plugin.
  - `placeholderText`: "Write text here..." - Placeholder for user input interfaces.

- **Options**:

  - `regex`: The regex pattern to search for.
  - `replacement`: The string to replace matches with.
  - `flags`: Optional regex flags (e.g., `i` for case-insensitive).

- **Notes**:
  - Because the value of a option is not given in the `evaluate` function, its important that you check what your option `type` is set to so you can handle the input appropriately. This is why I convert my options values to a string, as typescript otherwise will complain since it does not know which type is expected.

## Registering the Plugin

By default, all plugins are defined in one big chunk as a default exported object within `src/plugins/plugins.ts`.

You can either add your plugin there directly, or define your plugin in a seperate object by using the `Plugin` type.

```typescript
const myCustomPlugin: Plugin = {
    ...
}
```

Then add it to the plugins record as such:

```typescript
export default {
  myCustomPlugin,
  // Add more plugins here
} as Plugins;
```

There is no wrong or right way here, simply do what you prefer.
