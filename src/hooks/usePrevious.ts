import { useEffect, useRef } from 'react';

// https://phuoc.ng/collection/react-ref/save-the-previous-value-of-a-variable/
export default function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
