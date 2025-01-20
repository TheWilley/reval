import TextArea from './TextArea';
import useEval from '../hooks/useEval';
import Result from './Result';
import plugins from '../plugins/plugins';
import PluginOptions from './PluginOptions';
import { animated, useSpring } from '@react-spring/web';
import { easings } from '@react-spring/web';
import { useState } from 'react';
import addVariablesToTailwindClass from '../helpers/addVariablesToString';

function Row({ id, removeElement }: { id: number; removeElement: (id: number) => void }) {
  const {
    html,
    result,
    mode,
    pluginList,
    currentPlugin,
    pluginOptions,
    OnChangeExpression,
    clearExpression,
    onChangePluginOptions,
    setMode,
  } = useEval(id, plugins);

  const [isRemoving, setIsRemoving] = useState(false);

  const styles = useSpring({
    from: {
      opacity: '0%',
      transform: 'translate(0px, -20px)',
      maxHeight: '0px',
    },
    to: {
      opacity: isRemoving ? '0%' : '100%',
      transform: isRemoving ? 'translate(0px, -20px)' : 'translate(0px, 0px)',
      maxHeight: isRemoving ? '0px' : '999px',
    },
    config: {
      duration: 100,
      easing: easings.linear,
    },
  });

  const remove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeElement(id);
      clearExpression();
    }, 500);
  };

  return (
    <animated.li
      className='h-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out'
      style={styles}
    >
      <div
        className={addVariablesToTailwindClass(
          'grid grid-cols-1 gap-4 p-4',
          currentPlugin.hideResult ? 'lg:grid-cols-[7%_91%]' : 'lg:grid-cols-[7%_50%_40%]'
        )}
      >
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
          <TextArea
            html={html}
            placeholder={currentPlugin.placeholderText}
            onChange={OnChangeExpression}
          />
        </div>
        {currentPlugin.hideResult ? (
          ''
        ) : (
          <div className='flex items-center justify-center'>
            <Result state={result.state} value={result.value} />
          </div>
        )}
      </div>
    </animated.li>
  );
}

export default Row;
