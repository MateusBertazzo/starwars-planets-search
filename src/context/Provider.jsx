import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      json.results.forEach((e) => delete e.residents);
      setData(json.results);
    };
    fetchApi();
  }, []);

  const values = {
    data,
    inputName,
    setInputName,
  };

  return (
    <Context.Provider value={ values }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
