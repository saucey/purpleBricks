import './App.css';
import { ButtonStart } from 'wmca-shared-components';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const StartPage = () => {

  const navigate = useNavigate();

  const redirect = () => {
    navigate('/reporting')
  }

  const start = () => {
    return (
      <>
        <div className="wmnds-col-1  wmnds-p-lg">
          <h1 className="wmnds-fe-question">
            Report an issue
          </h1>
          <h2>
            Use this service to:
          </h2>
          <p>Use this service to report problems with:</p>
          <ul>
            <li>a bus shelter or stop</li>
            <li>a park and ride site</li>
            <li>an electronic display or printed information</li>
          </ul>
          <p>You can also <a href="https://www.tfwm.org.uk/get-help/report-anti-social-behaviour-on-public-transport/" target="_blank" className="wmnds-link" rel="noreferrer">report anti-social behaviour online</a></p>
          <p>This process takes around 5 minutes</p>
          <div className="wmnds-warning-text ">
            <svg className="wmnds-warning-text__icon">
              <use xlinkHref="#wmnds-general-warning-circle" href="#wmnds-general-warning-circle"></use>
            </svg>
            We manage bus stops, information and park and ride sites in the West Midlands county. If you live outside this area <a href='https://www.gov.uk/find-local-council' target='_blank' rel="noreferrer">report issue to your council</a>
          </div>
          <h2>Before you start</h2>
          <ul>
            <li>Take a photo of the problem to upload</li>
            <li>You should also take a photo of the bus stop sign and poster to help answer questions about the location</li>
          </ul>
          <div className="wmnds-col-1">
            <ButtonStart
              hasIcon
              label="Start Now"
              onClick={() => redirect()}
            />
          </div>
        </div>
      </>
    )
  };

  return (
    start()
  );
  
}





export default StartPage;
