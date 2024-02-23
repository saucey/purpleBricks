// FormTextarea.js
import React from 'react';
// import PropTypes from 'prop-types';

const FormTextarea = ({ id, name, label, errorMessage, isError, onChange, ...textareaProps }) => {

  const defaultId = name
  const finalId = id || defaultId;
  
  const groupClass = `wmnds-fe-group${isError ? ' wmnds-fe-group--error' : ''}`;
  const textareaClass = `wmnds-fe-textarea${isError ? ' wmnds-fe-input--error' : ''}`;

  return (
    <div className={`${groupClass} wmnds-m-t-20`}>
      <label className={`wmnds-fe-label wmnds-m-t-20`} htmlFor={finalId}>
        {label}
      </label>
      {isError && <span className="wmnds-fe-error-message">{errorMessage}</span>}
      <textarea className={textareaClass} id={finalId} name={name} onChange={onChange} {...textareaProps}></textarea>
    </div>
  );
};

// FormTextarea.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   errorMessage: PropTypes.string,
//   isError: PropTypes.bool,
//   onChange: PropTypes.func, // Add the onChange prop
// };

export {FormTextarea};
