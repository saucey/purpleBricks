import React from 'react';

export const ButtonFavorite = ({ label, isFavorited }) => {
  return (
    <button className="wmnds-btn wmnds-btn--favourite" type="button">
      <svg className="wmnds-btn__icon wmnds-btn__icon--left" data-testid="svg-component">
        <use xlinkHref={isFavorited ? '#wmnds-general-star' : '#wmnds-general-star-empty'} href={isFavorited ? '#wmnds-general-star' : '#wmnds-general-star-empty'}></use>
      </svg>
      {label}
    </button>
  );
};
