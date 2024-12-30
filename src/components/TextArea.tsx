import { ChangeEvent } from 'react';

function TextArea({
  expression,
  placeholder,
  onChange,
}: {
  expression: string | undefined;
  placeholder: string | undefined;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div
      className='grow-wrap textarea grid w-full p-0 outline-none'
      data-replicated-value={expression}
    >
      <textarea
        value={expression}
        onChange={onChange}
        className='textarea resize-none overflow-hidden font-mono'
        placeholder={placeholder || 'Write an expression here...'}
        data-testid='expression'
      />
    </div>
  );
}

export default TextArea;
