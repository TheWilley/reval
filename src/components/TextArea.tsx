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
      className='textarea h-full resize-none overflow-hidden font-mono'
      placeholder={placeholder || 'Write an expression here...'}
      data-testid='expression'
      role='textbox'
    />
  );
}

export default TextArea;
