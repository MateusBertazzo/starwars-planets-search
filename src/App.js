import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';

function App() {
  return (
    <section>
      <Provider>
        <Table />
      </Provider>
    </section>
  );
}

export default App;
