import { useState, useContext, useEffect } from 'react';
import './App.css';
import { FormDataContext } from './globalState/FormDataContext';
import reportFormData from './structure.json';
import { ButtonCta, SecondaryButton, TextInput } from 'wmca-shared-components';

const IncorrectInfo = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep } = formDataState;
  const [pageData, setPageData] = useState(null);  

  const initialInputValues = pageData ? pageData.options.reduce((acc, option) => {
    acc[option.name] = '';
    return acc;
  }, {}) : {};
  const [inputValues, setInputValues] = useState(initialInputValues);

  useEffect(() => {
    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);
  }, [currentStep]);

  useEffect(() => {
    // Filter the page data based on the current step ID
  }, [inputValues]);

  const redirect = () => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: 3,
    });
  };

  // Function to handle input change
  const handleInputChange = (event, name) => {
    setInputValues({ ...inputValues, [name]: event.target.value });
  };

  // Fetching options with id 2 from the JSON data

  return (
    <>
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <div className="wmnds-progress-indicator">
            Section 1 of 2
            <h4>About the issue</h4>
          </div>
          <h1 className="heading-2">Where is the incorrect information?</h1>
          {pageData.info && (
            <>
              <div className="wmnds-warning-text wmnds-m-b-lg">
                <svg className="wmnds-warning-text__icon">
                  <use xlinkHref="#wmnds-general-warning-circle" href="#wmnds-general-warning-circle"></use>
                </svg>
                <span dangerouslySetInnerHTML={{ __html: pageData.info }} />
              </div>
            </>
          )}
          {/* <SecondaryButton className="wmnds-m-b-lg" label="Map view" icon="general-location-pin" hasIcon /> */}

          {pageData.options.map((option, index) => (
          <TextInput
            key={index}
            id={option.name}
            name={option.name}
              label={ // label prop should be a React element
                <span dangerouslySetInnerHTML={{ __html: option.label }} />
              }
            errorMessage="Please enter a valid value"
            isError={false}
            value={inputValues[option.name]}
            onChange={(event) => handleInputChange(event, option.name)}
            placeholder="Enter your value"
          />
        ))}

          <ButtonCta label="Continue" onClick={redirect} />
        </div>
      )}
    </>
  );
};

export default IncorrectInfo;
