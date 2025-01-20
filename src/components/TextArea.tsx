import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import addVariablesToTailwindClass from '../helpers/addVariablesToTailwindClass';

function TextArea({
  expression,
  placeholder,
  disableExpressionTextWrapping,
  onChange,
}: {
  expression: string;
  placeholder?: string;
  disableExpressionTextWrapping?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <TextareaAutosize
      value={expression}
      onChange={onChange}
      maxRows={30}
      className={addVariablesToTailwindClass(
        'textarea max-h-[980px] min-h-full resize-none font-mono',
        disableExpressionTextWrapping && 'whitespace-nowrap'
      )}
      placeholder={placeholder || 'Write an expression here...'}
      data-testid='expression'
      role='textbox'
    />
  );
}

export default TextArea;
