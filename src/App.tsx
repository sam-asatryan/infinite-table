import React from 'react';
import InfiniteTable from './components/infinite-table';

import './app.scss';

function App() {
  return (
    <div className='app'>
      <h1>Infinite Table</h1>
      <div className='table-container'>
        <InfiniteTable/>
      </div>
    </div>
  );
}

export default App;
