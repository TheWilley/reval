import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react';

const MIN_TEXTAREA_HEIGHT = 10;

function TextArea({
  expression,
  onChange,
}: {
  expression: string | undefined;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lastHeight, setLastHeight] = useState<string | null>(null);

  useLayoutEffect(() => {
    // https://stackoverflow.com/a/65990608
    if (textareaRef.current !== null) {
      const rows = textareaRef.current.value.split('\n').length;

      // Reset height to recalculate
      textareaRef.current.style.height = 'inherit';

      if (rows < 30) {
        // Set height dynamically
        const newHeight = `${Math.max(
          textareaRef.current.scrollHeight,
          MIN_TEXTAREA_HEIGHT
        )}px`;
        textareaRef.current.style.height = newHeight;
        setLastHeight(newHeight);
        textareaRef.current.style.overflow = 'hidden';
      } else {
        // Keep the last height and allow overflow
        if (lastHeight) {
          textareaRef.current.style.height = lastHeight;
        }
        textareaRef.current.style.overflow = 'auto';
      }
    }
  }, [expression, lastHeight]);

  return (
    <textarea
      ref={textareaRef}
      value={expression}
      onChange={onChange}
      className='textarea w-full font-mono'
      style={{
        minHeight: MIN_TEXTAREA_HEIGHT,
        resize: 'none',
      }}
      data-testid='expression'
    />
  );
}

export default TextArea;
