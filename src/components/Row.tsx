import TextArea from './TextArea';
import useEval from '../hooks/useEval';
import Result from './Result';
import { useEffect, useState } from 'react';
import plugins from '../plugins/plugins';
import PluginOptions from './PluginOptions';

function Row({ id, removeElement }: { id: number; removeElement: (id: number) => void }) {
  const {
    html,
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

  const [styles, setStyles] = useState({
    opacity: '0%',
    translateY: '-20px',
    maxHeight: '0px',
  });

  useEffect(() => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      opacity: '100%',
      translateY: '0px',
      maxHeight: '999px',
    }));
  }, []);

  const remove = () => {
    setStyles({
      opacity: '0%',
      translateY: '-20px',
      maxHeight: '0px',
    });
    setTimeout(() => {
      removeElement(id);
      clearExpression();
    }, 300);
  };

  return (
    <li
      className='h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out'
      style={{
        opacity: styles.opacity,
        maxHeight: styles.maxHeight,
        transform: `translateY(${styles.translateY})`,
      }}
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
            {pluginList.map((plugin) => (
              <option value={plugin.key} key={plugin.key}>
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
          <TextArea html={html} placeholder={placeholder} onChange={OnChangeExpression} />
        </div>
        <div className='flex items-center justify-center'>
          <Result state={result.state} value={result.value} />
        </div>
      </div>
    </li>
  );
}

export default Row;
