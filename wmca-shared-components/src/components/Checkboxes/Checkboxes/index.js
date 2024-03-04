import React from 'react';

const Checkboxes = ({ options, title, onCheckboxChange, hasError, errorMessage }) => {

  const handleCheckboxChange = (value, isChecked) => {
    onCheckboxChange(value, isChecked);
  };

  return (
    <div className={`wmnds-fe-group${hasError ? ' wmnds-fe-group--error' : ''}`}>
      <div className="wmnds-fe-checkboxes">
        {hasError && (
          <span className="wmnds-fe-error-message">{errorMessage}</span>
        )}
        <span className="wmnds-fe-checkboxes__desc">{title}</span>
        {options.map((option, index) => (
          <label key={index} className="wmnds-fe-checkboxes__container">
            <div className="wmnds-m-b-lg">{option.label}</div>
            <input
              id={`checkboxes_option${index + 1}`}
              className="wmnds-fe-checkboxes__input"
              value={option.value}
              name={`checkboxes_option${index + 1}`}
              type="checkbox"
              checked={option.checked}
              onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
            />
            <span className="wmnds-fe-checkboxes__checkmark">
              <svg className="wmnds-fe-checkboxes__icon">
                <use xlinkHref="#wmnds-general-checkmark" href="#wmnds-general-checkmark"></use>
              </svg>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export  {Checkboxes};