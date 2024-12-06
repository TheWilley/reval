import React, { useRef } from 'react';
import { SaveFile } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function FileLoader({ onFileLoad }: { onFileLoad: (data: SaveFile) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsedData = JSON.parse(text);

        if (
          typeof parsedData.id === 'string' &&
          parsedData.id === 'reval' &&
          Array.isArray(parsedData.ids) &&
          Array.isArray(parsedData.expressions)
        ) {
          onFileLoad(parsedData as SaveFile);
        } else {
          throw new Error('Invalid file format');
        }
      } catch (err) {
        alert('Failed to load the file. Please make sure it is a valid JSON file.');
      }
    };

    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type='file'
        accept='.json'
        onChange={handleFileChange}
        className='hidden'
      />
      <FontAwesomeIcon
        icon={faUpload}
        className='cursor-pointer opacity-70 hover:opacity-100'
        onClick={triggerFileInput}
      />
    </>
  );
}

export default FileLoader;
