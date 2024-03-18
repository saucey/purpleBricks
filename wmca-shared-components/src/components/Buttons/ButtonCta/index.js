import React from 'react';

export const ButtonCta = ({
  label,
  isActive,
  isDisabled,
  hasIcon,
  isLoading,
  isDarkBg,
  onClick,
  className
}) => {
  const buttonClasses = ['wmnds-btn'];
  if (className) buttonClasses.push(className);
  if (isActive) buttonClasses.push('wmnds-is--active');
  if (isDisabled) buttonClasses.push('wmnds-btn--disabled');
  if (isDarkBg) buttonClasses.push('wmnds-btn--dark-bg');

  return (
    <button className={buttonClasses.join(' ')} type="button" disabled={isDisabled} onClick={onClick}>
      {label}
      {hasIcon && (
        <svg className="wmnds-btn__icon wmnds-btn__icon--right" data-testid="svg-component">
          <use xlinkHref="#wmnds-general-chevron-right" href="#wmnds-general-chevron-right"></use>
        </svg>
      )}
      {isLoading && (
        <div className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
      )}
    </button>
  );
};
