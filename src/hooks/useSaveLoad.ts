import { SaveFile } from '../types/types';
import {
  localStorageExpressionsArray,
  localStorageIdsArray,
} from '../utils/localStorageKeys';

export default function useSaveLoad() {
  const save = () => {
    const ids = localStorage.getItem(localStorageIdsArray);
    const expressions = localStorage.getItem(localStorageExpressionsArray);

    if (ids && expressions) {
      const savefile: SaveFile = {
        id: 'reval',
        ids: JSON.parse(ids),
        expressions: JSON.parse(expressions),
      };

      const fileName = 'reval_savefile.json';
      const json = JSON.stringify(savefile, null, 2);

      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      link.click();

      URL.revokeObjectURL(link.href);
    }
  };

  const load = (savefile: SaveFile) => {
    localStorage.setItem(localStorageIdsArray, JSON.stringify(savefile.ids));
    localStorage.setItem(
      localStorageExpressionsArray,
      JSON.stringify(savefile.expressions)
    );
    location.reload();
  };

  return [save, load] as const;
}
