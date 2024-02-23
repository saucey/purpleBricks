import React from 'react';

export const ButtonOpenClose = ({ label, isClose }) => {
  return (
    <button className={`wmnds-btn wmnds-btn--primary ${isClose ? 'wmnds-m-l-xs' : ''}`} type="button">
      {label}
    </button>
  );
};

