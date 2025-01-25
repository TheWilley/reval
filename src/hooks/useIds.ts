import { useCallback, useEffect, useState } from 'react';
import { localStorageIdsArray } from '../utils/localStorageKeys';

export default function useIds() {
  const [ids, setIds] = useState<number[]>(() => {
    const storedIds = localStorage.getItem(localStorageIdsArray);
    return storedIds ? JSON.parse(storedIds) : [];
  });

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.altKey) {
      switch (event.key) {
        case 'Enter': {
          addElement();
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    localStorage.setItem(localStorageIdsArray, JSON.stringify(ids));
  }, [ids]);

  const removeElement = (idToRemove: number) => {
    setIds((prevIds) => prevIds.filter((id) => id !== idToRemove));
  };

  const addElement = () => {
    setIds((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev) + 1 : 0;
      return [...prev, nextId];
    });
  };

  const moveElementUp = (id: number) => {
    setIds((prev) => {
      const index = prev.indexOf(id);
      if (index === 0) return prev;
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveElementDown = (id: number) => {
    setIds((prev) => {
      const index = prev.indexOf(id);
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  return { ids, addElement, removeElement, moveElementUp, moveElementDown };
}
