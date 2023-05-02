import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const COLUM = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterInputName, setFilterInputName] = useState('');
  const [filterColumn, setFilterColumn] = useState(COLUM);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      json.results.forEach((e) => delete e.residents);
      setData(json.results);
    };
    fetchApi();
  }, []);

  const values = useMemo(() => ({
    data,
    filterInputName,
    setFilterInputName,
    filterColumn,
    setFilterColumn,
  }), [data,
    filterInputName,
    setFilterInputName,
    filterColumn,
    setFilterColumn]);

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
