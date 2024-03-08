import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reportFormData from '../structure.json';
import { FormDataContext } from '../globalState/FormDataContext';

import { Radios, ButtonCta, TextInput, Checkboxes } from 'wmca-shared-components';
const CheckboxComponent = () => {
  const navigate = useNavigate();
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);
    if (currentPageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);
      if (matchingData) {
        setSelectedOptions(matchingData.selectedOptions);
      }
    } else {
      setSelectedOptions([]);
    }
  }, [currentStep, formData]);

  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const redirect = () => {

    if (selectedOptions.length === 0) {
      setHasError(true)
      return
    }

    const payload = {
      selectedOptions,
      "pageId": pageData.id
    }

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload
    });

    let nextPage = pageData?.nextId

    if (formDataState.answerChecks && currentStep !== 8 && currentStep !== 14 && currentStep !== 18 ) {
      nextPage = 22
    }

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: nextPage, currentStep: currentStep, futureStep: selectedOptions },
    });
  };

  return (
    <>
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <h1>{currentStep}</h1>
          <div className="wmnds-progress-indicator">
            Section {pageData.section} of 2
            <h4>About the issue</h4>
          </div>
          <h1 className="heading-2">{pageData.title}</h1>
          {pageData.options && (
            <Checkboxes
              title={pageData.title}
              onCheckboxChange={handleCheckboxChange}
              options={pageData.options.map(option => ({
                label: option.label.name,
                value: option.label.value,
                checked: selectedOptions.includes(option.label.value),
              }))}
              hasError={hasError}
              errorMessage={'Please select your options'}
            />
          )}
          <ButtonCta label="Continue" onClick={() => redirect()} />
        </div>
      )}
    </>
  );
}

export default CheckboxComponent;