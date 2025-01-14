import React from 'react';

export const ButtonSecondary = ({ label, isActive, isDisabled, hasIcon, isDarkBg, icon, className, onClick }) => {
  const buttonClasses = ['wmnds-btn', 'wmnds-btn--secondary'];

  if (className) buttonClasses.push(className);
  if (isDarkBg) buttonClasses.push('wmnds-btn--dark-bg');
  if (isActive) buttonClasses.push('wmnds-is--active');
  if (isDisabled) buttonClasses.push('wmnds-btn--disabled');

  return (
    <button className={buttonClasses.join(' ')} type="button" disabled={isDisabled} onClick={onClick}>
      {label}
      {hasIcon && (
        <svg className="wmnds-btn__icon wmnds-btn__icon--right" data-testid="svg-component">
          <use xlinkHref={`#wmnds-${icon}`} href={`#wmnds-${icon}`}></use>
        </svg>
      )}
    </button>
  );
};
