import React from 'react';

export const ButtonStart = ({ label, isActive, isDisabled, hasIcon, onClick }) => {
  // Define the base class
  let buttonClass = 'wmnds-btn wmnds-btn--start';

  // Add additional classes based on props
  if (isActive) {
    buttonClass += ' wmnds-is--active';
  }

  if (isDisabled) {
    buttonClass += ' wmnds-btn--disabled';
  }

  return (
    <button className={buttonClass} disabled={isDisabled} type="button" onClick={onClick}>
      {label}
      {hasIcon && (
        <svg className="wmnds-btn__icon wmnds-btn__icon--right" data-testid="svg-component">
          <use xlinkHref="#wmnds-general-chevron-right" href="#wmnds-general-chevron-right"></use>
        </svg>
      )}
    </button>
  );
};
