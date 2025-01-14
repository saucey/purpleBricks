import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

import { FormDataContext } from '../globalState/FormDataContext';
import { Link } from 'react-router-dom';

const AppLayoutPrimary = ({ children }) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { previousStep, currentStep } = formDataState;
  // const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault(); // Corrected typo
    formDataDispatch({
      type: 'GO_BACK',
    });

    formDataDispatch({
      type: 'REACHED_ANSWER_CHECKS',
      payload: { answerChecks: false },
    });
  };

  return (
    <main className="wmnds-container wmnds-container--main">
      <nav aria-label="Breadcrumb" class="wmnds-breadcrumb">
        <ol class="wmnds-breadcrumb__list">
          <li class="wmnds-breadcrumb__list-item">
            <a class="wmnds-breadcrumb__link" href="https://www.tfwm.org.uk/">Home</a>
          </li>
          <li class="wmnds-breadcrumb__list-item">
            <a class="wmnds-breadcrumb__link" href="https://www.tfwm.org.uk/get-help/">Get help</a>
          </li>
          <li class="wmnds-breadcrumb__list-item">
            <Link to="/" class="wmnds-breadcrumb__link">Report a problem with a bus stop or park and ride</Link>
          </li>
          <li class="wmnds-breadcrumb__list-item">
            <span class="wmnds-breadcrumb__link wmnds-breadcrumb__link--current" aria-current="page">Report a problem with a bus stop or park and ride</span>
          </li>
        </ol>
      </nav>
      {previousStep !== null && currentStep !== 1 &&( // Conditionally render the back button
      <button className="wmnds-btn wmnds-btn--link" type="button" onClick={e => goBack(e)}>
          <span>&lt; Back</span>
        </button>
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
