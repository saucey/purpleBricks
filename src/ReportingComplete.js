import './App.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';

const ReportingComplete = () => {

  const navigate = useNavigate();




  const complete = () => {
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
              <a href="#" class="wmnds-breadcrumb__link wmnds-breadcrumb__link--current" aria-current="page">Report complete</a>
            </li>
          </ol>
        </nav>
        <div className="wmnds-grid wmnds-p-t-lg">
          <div className="wmnds-col-1 wmnds-col-md-3-4">
            <div class="wmnds-msg-summary wmnds-msg-summary--success-fill-no-icon  wmnds-text-align-center">
              <div class="wmnds-msg-summary__header">
                <h1 class="wmnds-msg-summary__title wmnds-h2 wmnds-p-lg">We've recieved your form</h1>
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
