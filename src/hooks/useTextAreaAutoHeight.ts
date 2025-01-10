import { useCallback, useEffect, useRef } from 'react';

export default function useTextAreaAutoHeight() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const addListener = useCallback(() => {
    textAreaRef.current?.addEventListener('input', changeHeight);
  }, []);

  const changeHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    changeHeight();
    addListener();
  }, [addListener]);

  return [textAreaRef];
}
