import React from 'react';

export const ButtonDestructive = ({ label, isActive, isDisabled, hasIcon, onClick, icon = "general-chevron-right" }) => {
  // Define the base class
  let buttonClass = 'wmnds-btn wmnds-btn--destructive';

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
          <use xlinkHref={`#wmnds-${icon}`} href={`#wmnds-${icon}`}></use>
        </svg>
      )}
    </button>
  );
};

