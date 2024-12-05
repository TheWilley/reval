import { useCallback, useEffect, useState } from 'react';

export default function useIds() {
  const [ids, setIds] = useState<number[]>([]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.altKey) {
      switch (event.key) {
        case 'Enter': {
          addElement();
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const removeElement = (idToRemove: number) => {
    setIds((prevIds) => prevIds.filter((id) => id !== idToRemove));
  };

  const addElement = () => {
    setIds((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev) + 1 : 0;
      return [...prev, nextId];
    });
  };

  return [ids, addElement, removeElement] as const;
}
