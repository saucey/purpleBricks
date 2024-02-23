import React from 'react';

export const ButtonLink = ({ label }) => {
  return (
    <button className="wmnds-btn wmnds-btn--link" type="button">
      {label}
    </button>
  );
};
