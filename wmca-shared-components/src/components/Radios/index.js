import React from 'react';
// import PropTypes from 'prop-types';

export const Radios = ({ name, options, inline, error, defaultSelected, errorMessage, descriptionText, onSelect }) => {
  const groupClass = `wmnds-fe-group${error ? ' wmnds-fe-group--error' : ''}`;
  const radiosClass = `wmnds-fe-radios${inline ? ' wmnds-fe-radios--inline' : ''}`;

  const handleSelect = (value) => {
    onSelect(value);
  };

  return (
    <div className={groupClass}>
      <div className={radiosClass} role="radiogroup">
        {error && <span className="wmnds-fe-error-message">{errorMessage || 'Please select an option'}</span>}
        <span className="wmnds-fe-radios__desc">{descriptionText || 'Select all options that apply'}</span>

        {options.map((option, index) => (
          <label key={index} className="wmnds-fe-radios__container">
            {option.label}
            <input
              className="wmnds-fe-radios__input"
              value={option.value}
              checked={JSON.stringify(defaultSelected) === JSON.stringify(option.value)}
              name={name}
              type="radio"
              onChange={() => handleSelect(option.value)}
            />
            <span className="wmnds-fe-radios__checkmark"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Radios.propTypes = {
//   name: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   inline: PropTypes.bool,
//   error: PropTypes.bool,
//   defaultSelected: PropTypes.string,
//   errorMessage: PropTypes.string,
//   descriptionText: PropTypes.string,
//   onSelect: PropTypes.func.isRequired, // Callback function to handle selection
// };


