export type EvalObject = {
  expression: string;
  result: {
    state: 'error' | 'neutral' | 'success';
    value: string;
  };
};

export type LocalStorageExpressionsArray = {
  id: number;
  expression: string;
}[];
