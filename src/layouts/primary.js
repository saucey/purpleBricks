import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormDataContext } from '../globalState/FormDataContext';

const AppLayoutPrimary = ({ children }) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { previousStep, currentStep } = formDataState;
  const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault(); // Corrected typo
    console.log(formDataState, 'state back')
    formDataDispatch({
      type: 'GO_BACK',
    });
  };

  return (
    <main className="wmnds-container wmnds-container--main">
      {previousStep !== null && currentStep !== 1 &&( // Conditionally render the back button
        <a href="#" title="link title" target="_self" className="wmnds-link" onClick={e => goBack(e)}>
          <span>&lt; Back</span>
        </a>
      )}
      <div className="wmnds-grid wmnds-m-t-lg">
        <div className="main wmnds-col-1 wmnds-col-md-2-3 wmnds-m-b-xl wmnds-p-r-lg wmnds-p-r-sm-none">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AppLayoutPrimary;