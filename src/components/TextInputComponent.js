import { useState, useContext, useEffect } from 'react';
import '../App.css';
import { FormDataContext } from '../globalState/FormDataContext';
import reportFormData from '../structure.json';
import { ButtonCta, SecondaryButton, TextInput } from 'wmca-shared-components';

const TextInputComponent = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, futureStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [inputValues, setInputValues] = useState({}); // Initialize as empty object

  
  useEffect(() => {
    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);
    console.log(formDataState, 'state of the whole object')
    // Initialize inputValues with data from formData
    if (pageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);
      if (matchingData) {
        setInputValues(matchingData.inputValues);
      } else {
        // If no matching data found, set inputValues to empty strings
        const initialInputValues = pageData.options.reduce((acc, option) => {
          acc[option.name] = '';
          return acc;
        }, {});
        setInputValues(initialInputValues);
      }
    } else {
      // If no formData or pageData, set inputValues to empty object
      setInputValues({});
    }
  }, [currentStep, formData, pageData]);

  const redirect = () => {
    const payload = {
      inputValues,
      pageId: pageData.id
    };

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: currentStep === 2 ? formDataState.futureStep : pageData.nextId, currentStep },
    });

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload,
    });
  };

  // Function to handle input change
  const handleInputChange = (event, name) => {
    setInputValues({ ...inputValues, [name]: event.target.value });
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
              label={<span dangerouslySetInnerHTML={{ __html: option.label }} />}
              errorMessage="Please enter a valid value"
              isError={false}
              value={inputValues[option.name]}
              onChange={event => handleInputChange(event, option.name)}
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
