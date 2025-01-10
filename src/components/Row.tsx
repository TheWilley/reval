import TextArea from './TextArea';
import useEval from '../hooks/useEval';
import Result from './Result';
import { useEffect, useRef, useState } from 'react';
import plugins from '../plugins/plugins';
import PluginOptions from './PluginOptions';

function Row({ id, removeElement }: { id: number; removeElement: (id: number) => void }) {
  const {
    expression,
    result,
    mode,
    pluginList,
    placeholder,
    currentPlugin,
    pluginOptions,
    OnChangeExpression,
    clearExpression,
    onChangePluginOptions,
    setMode,
  } = useEval(id, plugins);
  const [opacity, setOpacity] = useState('0%');
  const [rotate, setRotate] = useState('-20px');
  const [maxHeight, setMaxHeight] = useState('999px');
  const rowRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpacity('100%');
    setRotate('0px');
  }, []);

  useEffect(() => {
    if (rowRef.current) {
      const height = rowRef.current.scrollHeight * 2;
      setMaxHeight(`${height}px`);
    }
  }, [expression]);

  const remove = () => {
    setOpacity('0%');
    setRotate('-20px');
    setMaxHeight('0px');
    setTimeout(() => {
      removeElement(id);
      clearExpression();
    }, 300);
  };

  return (
    <li
      className='rounded-lg shadow-lg transition-all duration-300 ease-in-out'
      style={{ opacity, maxHeight, translate: `0px ${rotate}` }}
      ref={rowRef}
    >
      <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-[7%_50%_40%]'>
        <div className='flex items-center justify-center gap-2 lg:block'>
          <button
            className='btn btn-warning btn-sm mb-2 mt-2 w-full max-w-[8em] rounded-md px-3 py-1'
            onClick={remove}
            data-testid='remove'
          >
            Remove
          </button>
          <select
            className='select select-sm w-full max-w-[8em]'
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            data-testid='mode'
          >
            <option disabled>Mode</option>
            {pluginList.map((plugin, index) => (
              <option value={plugin.key} defaultChecked={index === 0} key={plugin.key}>
                {plugin.name}
              </option>
            ))}
          </select>
          {currentPlugin.options && (
            <PluginOptions
              options={pluginOptions}
              id={id}
              onChange={onChangePluginOptions}
            />
          )}
        </div>
        <div className='mt-2 grid'>
          <TextArea
            expression={expression}
            placeholder={placeholder}
            onChange={OnChangeExpression}
          />
        </div>
        <div className='flex items-center justify-center'>
          <Result state={result.state} value={result.value} />
        </div>
      </div>
    </li>
  );
}

export default Row;
