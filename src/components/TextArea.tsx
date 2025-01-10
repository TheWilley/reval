import { ChangeEvent } from 'react';
import useTextAreaAutoHeight from '../hooks/useTextAreaAutoHeight';

function TextArea({
  expression,
  placeholder,
  onChange,
}: {
  expression: string | undefined;
  placeholder: string | undefined;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [textareaRef] = useTextAreaAutoHeight();

  return (
    <textarea
      value={expression}
      onChange={onChange}
      ref={textareaRef}
      className='textarea h-full resize-none overflow-hidden font-mono'
      placeholder={placeholder || 'Write an expression here...'}
      data-testid='expression'
    />
  );
}

export default TextArea;
