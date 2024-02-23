// TextInput.js
import React from 'react';
// import PropTypes from 'prop-types';

const TextInput = ({ id, name, label, errorMessage, isError, value, onChange, ...inputProps }) => {
  const defaultId = name
  const finalId = id || defaultId;
  const groupClass = `wmnds-fe-group${isError ? ' wmnds-fe-group--error' : ''}`;
  const inputClass = `wmnds-fe-input${isError ? ' wmnds-fe-input--error' : ''}`;

  return (
    <div className={groupClass}>
      <label className="wmnds-fe-label" htmlFor={finalId}>
        {label}
      </label>
      {isError && <span className="wmnds-fe-error-message">{errorMessage}</span>}
      <input
        className={inputClass}
        id={finalId}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
};

// TextInput.propTypes = {
//   id: PropTypes.string, // id is not marked as required as it can be generated
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   errorMessage: PropTypes.string,
//   isError: PropTypes.bool,
//   value: PropTypes.string, // The value of the input
//   onChange: PropTypes.func, // Callback function triggered on input change
// };

export { TextInput };
