import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormDataContext } from '../globalState/FormDataContext';
import { Radios, ButtonCta } from 'wmca-shared-components';
import reportFormData from '../structure.json';

import { transformString } from '../utils/index'

const RadioComponent = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);
  // const [pageDataState, setPageDataState] = useState(null);
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(undefined); // Initial selected option
  const navigate = useNavigate();

  useEffect(() => {
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);
    // Initialize inputValues with data from formData
    if (pageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);
      if (matchingData) {
        setSelectedOption(matchingData.selectedOption);
      }
    } else {
      // If no formData or pageData, set inputValues to empty object
      setSelectedOption(undefined);
    }
  }, [currentStep, formData, pageData]);

  const handleSelect = (value) => {
    console.log(value)
    setSelectedOption(value);
  };

  const redirect = () => {
    setError(selectedOption === undefined ? true : false);
    if (selectedOption === undefined) {
      return
    }
    const payload = {
      selectedOption,
      "pageId": pageData.id
    }

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: selectedOption?.skip ? selectedOption?.nextId : pageData?.nextId, currentStep: currentStep, futureStep: selectedOption.nextId }, // Increment the current step
    });

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload 
    });
    
  };

  

  return (
    <>
      {/* <h1>current:{currentStep}</h1> */}
      {/* <h1>next:{pageData?.nextId}</h1> */}
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <h1 className="heading-2">{pageData.title}</h1>
          { pageData.options && (
            <Radios
              name="whats-reporting"
              descriptionText={false}
              error={error}
              defaultSelected={selectedOption}
              onSelect={handleSelect}
              options={pageData.options.map(option => ({
                label: option.label.name,
                name: option.name,
                value: { nextId: option.label.nextId, skip: option.label.skip } // Use label as value
              }))}
            />
          )}
          <ButtonCta label="Continue" onClick={() => redirect()} />
        </div>
      )}
    </>
  );
};

export default RadioComponent;
