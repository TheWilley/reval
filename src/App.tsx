import Header from './components/Header';
import Rows from './components/Rows';
import useIds from './hooks/useIds';

function App() {
  const [ids, addElement, removeElement] = useIds();
  return (
    <>
      <Header />
      <Rows ids={ids} addElement={addElement} removeElement={removeElement} />
    </>
  );
}

export default App;
