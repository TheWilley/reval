import Header from './components/Header';
import Rows from './components/Rows';
import useIds from './hooks/useIds';

function App() {
  const { ids, addElement, removeElement, moveElementUp, moveElementDown } = useIds();
  return (
    <>
      <Header />
      <Rows
        ids={ids}
        addElement={addElement}
        removeElement={removeElement}
        moveElementUp={moveElementUp}
        moveElementDown={moveElementDown}
      />
    </>
  );
}

export default App;
