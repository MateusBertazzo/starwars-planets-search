import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [allFilters, setAllFilters] = useState({
    column: 'population', comparison: 'maior que', number: 0,
  });
  const [filtredMethod, setFilterMethod] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      json.results.forEach((e) => delete e.residents);
      setData(json.results);
    };
    fetchApi();
  }, []);

  const handleFilter = useCallback(() => {
    if (allFilters.comparison.includes('maior que')) {
      const filtered = data
        .filter((e) => Number(e[allFilters.column] > Number(allFilters.number)));
      setData(filtered);
      setFilterMethod((prevState) => [...prevState, allFilters]);
    } else if (allFilters.comparison.includes('menor que')) {
      const filtered = data
        .filter((e) => Number(e[allFilters.column]) < allFilters.number);
      setData(filtered);
      setFilterMethod((prevState) => [...prevState, allFilters]);
    } else if (allFilters.comparison.includes('igual a')) {
      const filtered = data
        .filter((e) => Number(e[allFilters.column] === allFilters.number));
      setData(filtered);
      setFilterMethod((prevState) => [...prevState, allFilters]);
    }
  }, [data, allFilters]);

  const values = useMemo(() => ({
    data,
    filterInputName,
    setFilterInputName,
    filterColumn,
    setFilterColumn,
    allFilters,
    setAllFilters,
    filtredMethod,
    setFilterMethod,
    handleFilter,
  }), [data,
    filterInputName,
    setFilterInputName,
    filterColumn,
    setFilterColumn,
    allFilters,
    setAllFilters,
    filtredMethod,
    setFilterMethod,
    handleFilter]);

  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
