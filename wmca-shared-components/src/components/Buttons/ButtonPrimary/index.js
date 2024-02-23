import React from 'react';

export const ButtonPrimary = ({ label, isActive, isDisabled, hasIcon }) => {
  const buttonClasses = ['wmnds-btn', 'wmnds-btn--primary'];

  if (isActive) buttonClasses.push('wmnds-is--active');
  if (isDisabled) buttonClasses.push('wmnds-btn--disabled');

  return (
    <button className={buttonClasses.join(' ')} type="button" disabled={isDisabled}>
      {label}
      {hasIcon && (
        <svg className="wmnds-btn__icon wmnds-btn__icon--right" data-testid="svg-component">
          <use xlinkHref="#wmnds-general-chevron-right" href="#wmnds-general-chevron-right"></use>
        </svg>
      )}
    </button>
  );
};
