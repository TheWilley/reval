import { ChangeEvent } from 'react';

function TextArea({
  expression,
  onChange,
}: {
  expression: string | undefined;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className='grow-wrap grid w-full' data-replicated-value={expression}>
      <textarea
        value={expression}
        onChange={onChange}
        className='textarea resize-none overflow-hidden font-mono'
        placeholder='Write an expression here...'
        data-testid='expression'
      />
    </div>
  );
}

export default TextArea;
