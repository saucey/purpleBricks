import React from 'react';

export const ModeButton = ({ label, icon, isActive, isDisabled }) => {
  // Define the base class
  let buttonClass = 'wmnds-btn wmnds-btn--mode';

  // Add additional classes based on props
  if (isActive) {
    buttonClass += ' wmnds-is--active';
  }

  if (isDisabled) {
    buttonClass += ' wmnds-btn--disabled';
  }

  return (
    <button className={buttonClass} disabled={isDisabled} type="button">
      <svg className="wmnds-btn__icon wmnds-btn__icon--left" data-testid="svg-component">
        <use xlinkHref={icon} href={icon}></use>
      </svg>
      {label}
    </button>
  );
};

