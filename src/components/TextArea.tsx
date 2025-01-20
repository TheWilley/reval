import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function TextArea({
  expression,
  placeholder,
  onChange,
}: {
  expression: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <TextareaAutosize
      value={expression}
      onChange={onChange}
      maxRows={30}
      className='textarea max-h-[980px] min-h-full resize-none font-mono'
      placeholder={placeholder || 'Write an expression here...'}
      data-testid='expression'
      role='textbox'
    />
  );
}

export default TextArea;
