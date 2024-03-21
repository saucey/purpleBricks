import './App.css';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormDataContext } from './globalState/FormDataContext';

const ReportingComplete = () => {

  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { answerChecksSubmitted } = formDataState;
  const navigate = useNavigate()

  console.log(answerChecksSubmitted)


  useEffect(() => {
    if (!answerChecksSubmitted) {
      navigate('/')
    }

    formDataDispatch({
      type: 'ANSWER_CHECKS_SUBMITTED',
      payload: { answerChecksSubmitted: false }
    });
  }, []);


  const complete = () => {
    return (
      <main className="wmnds-container wmnds-container--main">
        <nav aria-label="Breadcrumb" className="wmnds-breadcrumb">
          <ol className="wmnds-breadcrumb__list">
            <li className="wmnds-breadcrumb__list-item">
              <a className="wmnds-breadcrumb__link" href="https://www.tfwm.org.uk/">Home</a>
            </li>
            <li className="wmnds-breadcrumb__list-item">
              <a className="wmnds-breadcrumb__link" href="https://www.tfwm.org.uk/get-help/">Get help</a>
            </li>
            <li className="wmnds-breadcrumb__list-item">
              <Link to="/" className="wmnds-breadcrumb__link">Report a problem with a bus stop or park and ride</Link>
            </li>
            <li className="wmnds-breadcrumb__list-item">
              <span className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current" aria-current="page">Report complete</span>
            </li>
          </ol>
        </nav>
        <div className="wmnds-grid wmnds-p-t-lg">
          <div className="wmnds-col-1 wmnds-col-md-3-4">
            <div className="wmnds-msg-summary wmnds-msg-summary--success-fill-no-icon  wmnds-text-align-center">
              <div className="wmnds-msg-summary__header">
                <h1 className="wmnds-msg-summary__title wmnds-h2 wmnds-p-lg">We've recieved your form</h1>
              </div>
            </div>
            <h2 className="wmnds-h1">What happens next</h2>
            <p>You’ll receive an email to confirm that we have received your report of an issue.</p>
            <p>It can take up to XX weeks to process a request. It may take longer if we need more information from you.</p>
            <p>If you have not received a response within 2 days, please contact our Customer Services team on 0345 303 6760.</p>
          </div>
        </div>
      </main>
    )
  };

  return (
    complete()
  );
  
}





export default ReportingComplete;
