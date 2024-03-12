// TextInput.js
import React from 'react';

const TextInput = ({
  id,
  name,
  label,
  errorMessage,
  isError,
  value,
  onChange,
  type = 'text', // Default type is set to text
  ...inputProps
}) => {
  const defaultId = name;
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
        type={type} /* Use the dynamic type here */
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
};

export { TextInput };
