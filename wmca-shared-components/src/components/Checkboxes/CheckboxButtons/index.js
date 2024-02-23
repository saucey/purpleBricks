import React, { useState } from 'react';

const CheckboxButtons = ({ options, title, defaultSelectedOptions = [] }) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);

  // Add the blank default option
  const updatedOptions = ['Choose from the list', ...options];

  const handleCheckboxChange = (option) => {
    const updatedSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelectedOptions);
  };

  return (
    <div className="wmnds-fe-group">
      <div className="wmnds-fe-checkbox-buttons">
        <span className="wmnds-fe-checkbox-buttons__desc">
          {title}
        </span>
        <div className="wmnds-fe-checkbox-buttons__container">
          {updatedOptions.map((option) => (
            <React.Fragment key={option}>
              <input
                id={`checkboxButtons_${option}`}
                className="wmnds-screenreaders-only wmnds-fe-checkbox-buttons__input"
                value={option}
                name={`checkboxButtons_${option}`}
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <label
                htmlFor={`checkboxButtons_${option}`}
                className={`wmnds-fe-checkbox-button wmnds-btn wmnds-btn--secondary ${selectedOptions.includes(option) ? 'wmnds-btn--is-checked' : ''}`}
              >
                {option}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckboxButtons;
