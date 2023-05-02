import React, { useContext } from 'react';
import Context from '../context/Context';

function Form() {
  const { inputName, setInputName } = useContext(Context);
  return (
    <div>
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          id="name"
          data-testid="name-filter"
          value={ inputName }
          onChange={ ({ target }) => setInputName(target.value) }
        />
      </label>
    </div>
  );
}

export default Form;
