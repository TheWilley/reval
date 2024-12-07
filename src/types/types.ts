export type EvalResult = {
  state: 'error' | 'neutral' | 'success';
  value: string;
};

export type Expression = {
  id: number;
  expression: string;
  mode: 'eval' | 'math';
};

export type SaveFile = {
  id: 'reval';
  ids: number[];
  expressions: Expression[];
};
