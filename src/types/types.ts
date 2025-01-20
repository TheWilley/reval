export type EvalResult = {
  state: 'error' | 'neutral' | 'success';
  value: string;
};

export type Expression = {
  id: number;
  expression: string;
  mode: string;
  pluginOptions: PluginOption;
};

export type SaveFile = {
  id: 'reval';
  ids: number[];
  expressions: Expression[];
};

export type PluginOption = {
  [key: string]: {
    name: string;
    type: 'string' | 'boolean' | 'number' | 'select';
    value: string | boolean | number;
    placeholderText?: string;
    options?: string[];
  };
};

export type Plugin = {
  evaluate: (expression: string, options?: PluginOption) => string;
  name: string;
  placeholderText?: string;
  options?: PluginOption;
  configuration?: {
    disableExpressionTextWrapping?: boolean;
    hideResult?: boolean;
  };
};

export type Plugins = Record<string, Plugin>;
