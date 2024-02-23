// ButtonPayment.js
import React from 'react';

export const ButtonPayment = ({ label, isActive, isDisabled, hasRightIcon }) => {
  const buttonClass = `wmnds-btn wmnds-btn--primary${isActive ? ' wmnds-is--active' : ''}${isDisabled ? ' wmnds-btn--disabled' : ''}`;

  return (
    <button className={buttonClass} type="button" disabled={isDisabled}>
      {label} <svg className="wmnds-swift-logo-inline" data-testid="svg-component">
        <use xlinkHref="#wmnds-swift-full-logo" href="#wmnds-swift-full-logo"></use>
      </svg>
      {hasRightIcon && (
        <svg className="wmnds-btn__icon wmnds-btn__icon--right" data-testid="svg-component-right-icon">
          <use xlinkHref="#wmnds-general-chevron-right" href="#wmnds-general-chevron-right"></use>
        </svg>
      )}
    </button>
  );
};
