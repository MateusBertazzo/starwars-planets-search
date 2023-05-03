import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';

function App() {
  return (
    <section>
      <h1>Star Wars Planets</h1>
      <Provider>
        <Table />
      </Provider>
    </section>
  );
}

export default App;
