import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const initialCOLUM = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [initialApi, setInitialApi] = useState([]);
  const [filterInputName, setFilterInputName] = useState('');
  const [filterColumn, setFilterColumn] = useState(initialCOLUM);
  const [filtredMethod, setFilterMethod] = useState([]);
  const [allFilters, setAllFilters] = useState({
    column: 'Selecione...', comparison: 'maior que', number: 0,
  });
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      json.results.forEach((e) => delete e.residents);
      setData(json.results);
      setInitialApi(json.results);
    };
    fetchApi();
  }, []);

  const handleFilter = useCallback(() => {
    setFilterColumn(filterColumn.filter((option) => option !== allFilters.column));
    setAllFilters({
      ...allFilters,
      column: filterColumn[0],
    });

    if (allFilters.comparison.includes('maior que')) {
      const filtered = data
        .filter((e) => Number(e[allFilters.column] > Number(allFilters.number)));
      setData(filtered);
      setFilterMethod((prevState) => [...prevState, allFilters]);
    } else if (allFilters.comparison.includes('menor que')) {
      const filtered = data
        .filter((e) => Number(e[allFilters.column]) < Number(allFilters.number));
      setData(filtered);
      setFilterMethod((prevState) => [...prevState, allFilters]);
    } else if (allFilters.comparison.includes('igual a')) {
      const filtered = data
        .filter((e) => Number(e[allFilters.column] === Number(allFilters.number)));
      setData(filtered);
      setFilterMethod((prevState) => [...prevState, allFilters]);
    }
  }, [data, allFilters, filterColumn]);

  const removeFilter = useCallback((filterRemove, column) => {
    setFilterColumn([...filterColumn, column]);
    const newFilters = filtredMethod.filter((_, index) => index !== filterRemove);
    setFilterMethod(newFilters);
  }, [filtredMethod, filterColumn]);

  const removeAll = useCallback(() => {
    setFilterMethod([]);
    setFilterColumn(initialCOLUM);
  }, []);

  const newHandleFilter = useCallback((column, comparison, value) => {
    switch (comparison) {
    case 'maior que': {
      return +column > +value;
    }
    case 'menor que': {
      return +column < +value;
    }
    case 'igual a': {
      return +column === +value;
    }
    default:
      return true;
    }
  }, []);

  useEffect(() => {
    let newDataFiltred = [...initialApi];
    filtredMethod.forEach(({ column, comparison, number }) => {
      newDataFiltred = newDataFiltred
        .filter((planet) => newHandleFilter(
          Number(planet[column]),
          comparison,
          number,
        ));
    });
    setData(newDataFiltred);
  }, [filtredMethod, newHandleFilter, initialApi]);

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
    removeFilter,
    removeAll,
  }), [data,
    filterInputName,
    setFilterInputName,
    filterColumn,
    setFilterColumn,
    allFilters,
    setAllFilters,
    filtredMethod,
    setFilterMethod,
    handleFilter,
    removeFilter,
    removeAll,
  ]);

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
