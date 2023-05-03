import React, { useContext } from 'react';
import Context from '../context/Context';

function Form() {
  const {
    filterInputName, setFilterInputName, filterColumn, allFilters,
    setAllFilters, handleFilter,
  } = useContext(Context);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setAllFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <label htmlFor="name">
        Filtar por Nome:
        <input
          type="text"
          name="name"
          id="name"
          data-testid="name-filter"
          value={ filterInputName }
          onChange={ ({ target }) => setFilterInputName(target.value) }
        />
      </label>

      <label htmlFor="Column">
        Filtar por Coluna:
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          value={ allFilters.column }
          onChange={ handleChange }
        >
          { filterColumn.map((option) => (
            <option key={ option } value={ option }>{ option }</option>
          )) }
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Compare:
        <select
          name="comparison"
          id="comparison-filter"
          value={ allFilters.comparison }
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        type="number"
        data-testid="value-filter"
        name="number"
        value={ allFilters.number }
        onChange={ handleChange }
      />

      <button
        onClick={ handleFilter }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default Form;
