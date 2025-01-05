import Header from './components/Header';
import Rows from './components/Rows';
import { SettingsProvider } from './components/settings/SettingsContext';
import useIds from './hooks/useIds';

function App() {
  const [ids, addElement, removeElement] = useIds();
  return (
    <>
      <SettingsProvider>
        <Header />
        <Rows ids={ids} addElement={addElement} removeElement={removeElement} />
      </SettingsProvider>
    </>
  );
}

export default App;
