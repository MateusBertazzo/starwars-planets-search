import React, { useContext } from 'react';
import Context from '../context/Context';

function Form() {
  const {
    filterInputName,
    setFilterInputName,
    filterColumn,
    allFilters,
    setAllFilters,
    handleFilter,
    removeFilter,
    filtredMethod,
    removeAll,
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
          <option id="column">Selecione...</option>
          { filterColumn.map((option) => (
            <option id="column" key={ option } value={ option }>{ option }</option>
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

      <div>
        {filtredMethod.map(({ column, comparison, number }, index) => (
          <div data-testid="filter" key={ index }>
            <p>
              {`${column.toUpperCase()} ${comparison.toUpperCase()} ${number}`}
            </p>
            <button
              type="button"
              onClick={ () => removeFilter(index, column) }
            >
              Remover

            </button>
          </div>
        ))}

        <button
          data-testid="button-remove-filters"
          onClick={ () => removeAll() }
        >
          Delete Filters
        </button>
      </div>
    </div>
  );
}

export default Form;
