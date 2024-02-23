import React from 'react';

const Dropdown = ({ label, id, name, options, hasError, errorMessage, onSelectChange }) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };

  // Add the blank default option
  const updatedOptions = [{ label: 'Choose from the list', value: '' }, ...options];

  return (
    <div className={`wmnds-fe-group ${hasError ? 'wmnds-fe-group--error' : ''}`}>
      <div className="wmnds-fe-dropdown">
        {hasError && <span className="wmnds-fe-error-message">{errorMessage}</span>}
        <label className="wmnds-fe-label" htmlFor={id}>
          {label}
        </label>
        <select
          className="wmnds-fe-dropdown__select"
          id={id}
          name={name}
          onChange={handleSelectChange}
        >
          {updatedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { Dropdown };
