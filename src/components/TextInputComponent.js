import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { FormDataContext } from '../globalState/FormDataContext';
import reportFormData from '../structure.json';
import { ButtonCta, SecondaryButton, TextInput } from 'wmca-shared-components';

const TextInputComponent = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, futureStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);

    if (pageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);
      if (matchingData) {
        setInputValues(matchingData.inputValues);
      } else {
        const initialInputValues = pageData.options.reduce((acc, option) => {
          acc[option.name] = '';
          return acc;
        }, {});
        setInputValues(initialInputValues);
      }
    } else {
      setInputValues({});
    }
  }, [currentStep, formData, pageData]);

  const redirect = () => {

    const initialErrors = {};

    pageData.options.forEach(option => {
      const { name } = option;
      const value = inputValues[name];
      const validationRules = pageData?.validation?.rules;
      if (validationRules && validationRules[name]?.required) {
        console.log(value, 'value')
        initialErrors[name] = !value || !value.trim();
      }

      if (option.type === 'email' && value) {
        initialErrors[name] = !isValidEmail(value);
      }

    });

    setErrors(initialErrors);

    // Loop through the errors object
    for (const errorKey in initialErrors) {
      if (initialErrors.hasOwnProperty(errorKey) && initialErrors[errorKey]) {
        // If any property is true, it means there's an error, stop the redirection
        console.log("Code execution stopped due to validation errors.");
        return;
      }
    }

    // Continue with form submission if no errors
    console.log("Validation passed. Proceeding with form submission.");

    const payload = {
      inputValues,
      pageId: pageData.id
    };

    let nextPage = currentStep === 2 ? formDataState.futureStep : pageData.nextId;

    if (formDataState.answerChecks) {
      nextPage = 22;
    }

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: nextPage, currentStep },
    });

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload,
    });
  };


  const handleInputChange = (event, name, type) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, [name]: value });

    const validationRules = pageData?.validation?.rules;
    if (validationRules && validationRules[name]?.required) {
      setErrors({ ...errors, [name]: !value || !value.trim() });
    }

    if (type === 'email' && value) {
      const isValid = isValidEmail(value);
      setErrors({ ...errors, [name]: !isValid });
    }
    
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(email);
    return valid
  };

  return (
    <>
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <h1>current {currentStep}</h1>
          <div className="wmnds-progress-indicator">
            Section {pageData.section} of 2
            <h4>About the issue</h4>
          </div>
          <h1 className="heading-2">{currentStep === 2 && futureStep === 3 ? pageData.title2 : pageData.title}</h1>
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

          {pageData.options.map((option, index) => (
            <TextInput
              key={index}
              id={option.name}
              name={option.name}
              type={option.type || 'text'}
              label={<span dangerouslySetInnerHTML={{ __html: option.label }} />}
              errorMessage={errors[option.name] && (option.type === 'email' && inputValues[option.name] !== '' ? "Please enter a valid email address" : "This field is required")}
              isError={errors[option.name]}
              value={inputValues[option.name]}
              onChange={event => handleInputChange(event, option.name, option.type)}
              placeholder="Enter your value"
            />
          ))}

          <ButtonCta label="Continue" onClick={() => redirect()} />
        </div>
      )}
    </>
  );
};

export default TextInputComponent;
