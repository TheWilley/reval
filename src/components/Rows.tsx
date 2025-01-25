import { animated, useSpring } from '@react-spring/web';
import Row from './Row';

function Rows({
  ids,
  addElement,
  removeElement,
  moveElementUp,
  moveElementDown,
}: {
  ids: number[];
  addElement: () => void;
  removeElement: (id: number) => void;
  moveElementUp: (id: number) => void;
  moveElementDown: (id: number) => void;
}) {
  const styles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 500,
    },
  });

  return (
    <animated.div style={styles}>
      <div
        className={'overflow-x-hidden rounded-md bg-base-200 text-left transition-all'}
      >
        <ul>
          {ids.map((id) => (
            <Row
              key={id}
              id={id}
              removeElement={removeElement}
              moveElementUp={moveElementUp}
              moveElementDown={moveElementDown}
            />
          ))}
        </ul>
      </div>
      <div
        className='mb-5 mt-5 cursor-pointer opacity-70 hover:opacity-100'
        onClick={addElement}
      >
        Alt + Enter or click here to add row
      </div>
    </animated.div>
  );
}

export default Rows;
