import TextArea from './TextArea';
import useEval from '../hooks/useEval';
import Result from './Result';
import plugins from '../plugins/plugins';
import PluginOptions from './PluginOptions';
import { animated, useSpring } from '@react-spring/web';
import { easings } from '@react-spring/web';
import { useState } from 'react';
import addVariablesToTailwindClass from '../helpers/addVariablesToTailwindClass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Row({
  id,
  removeElement,
  moveElementUp,
  moveElementDown,
}: {
  id: number;
  removeElement: (id: number) => void;
  moveElementUp: (id: number) => void;
  moveElementDown: (id: number) => void;
}) {
  const {
    expression,
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
          currentPlugin.configuration?.hideResult
            ? 'lg:grid-cols-[2%_7%_88%]'
            : 'lg:grid-cols-[2%_7%_47%_40%]'
        )}
      >
        <div className='hidden lg:block'>
          <button
            className='btn btn-sm mb-1 mt-1 w-full max-w-[8em] rounded-md px-3 py-1 opacity-60 shadow-none'
            onClick={() => moveElementUp(id)}
            data-testid='move-up'
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className='btn btn-sm mb-1 mt-1 w-full max-w-[8em] rounded-md px-3 py-1 opacity-60 shadow-none'
            onClick={() => moveElementDown(id)}
            data-testid='move-down'
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className='flex items-center justify-center gap-2 lg:block'>
          <button
            className='btn btn-sm mb-1 mt-1 w-full max-w-[8em] rounded-md px-3 py-1 opacity-60 shadow-none lg:hidden'
            onClick={() => moveElementUp(id)}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
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
          <button
            className='btn btn-sm mb-1 mt-1 w-full max-w-[8em] rounded-md px-3 py-1 opacity-60 shadow-none lg:hidden'
            onClick={() => moveElementDown(id)}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div className='mt-2 grid'>
          <TextArea
            expression={expression}
            placeholder={currentPlugin.placeholderText}
            disableExpressionTextWrapping={
              currentPlugin.configuration?.disableExpressionTextWrapping
            }
            onChange={OnChangeExpression}
          />
        </div>
        {currentPlugin.configuration?.hideResult ? (
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
