/* eslint-disable import/extensions */
import { useEffect } from 'react';
import GlobalStyle from './style/Global';
import Searchbar from './components/Searchbar';
import checkCache from './api/check-cache';

function App() {
  useEffect(() => {
    checkCache();
  });

  return (
    <>
      <GlobalStyle />
      <Searchbar />
    </>
  );
}

export default App;
