import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

function TextArea({
  html,
  placeholder,
  onChange,
}: {
  html: string;
  placeholder?: string;
  onChange: (e: ContentEditableEvent) => void;
}) {
  return (
    <ContentEditable
      html={html}
      onChange={onChange}
      className='textarea h-[98%] max-h-[980px] resize-none overflow-auto font-mono'
      placeholder={placeholder || 'Write an expression here...'}
      data-testid='expression'
      role='textbox'
    />
  );
}

export default TextArea;
