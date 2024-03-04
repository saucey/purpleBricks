import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import reportFormData from '../structure.json';
import { FormDataContext } from '../globalState/FormDataContext';

import { Radios, ButtonCta, TextInput, Checkboxes, Dropdown } from 'wmca-shared-components';

const DropdownComponent = () => {
  const navigate = useNavigate();
  
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');

  
  useEffect(() => {
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);
    // Initialize inputValues with data from formData
    if (pageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);
      if (matchingData) {
        setSelectedValue(matchingData.selectedValue);
      } 
    } else {
      // If no formData or pageData, set inputValues to empty object
      setSelectedValue('');
    }
  }, [currentStep, formData, pageData]);

  const redirect = () => {

    if (!selectedValue) {
      setHasError(true)
      return
    }

    const payload = {
      selectedValue,
      "pageId": pageData.id
    }

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload
    });

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: pageData?.nextId, currentStep: currentStep }, // Increment the current step
    });
  };


  // State to manage the selected value

  // State for error handling
  const [hasError, setHasError] = useState(false);

  // Function to handle changes in the dropdown selection
  const handleSelectChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    // Your custom validation logic can be placed here
    // For example, if you want to ensure the user has selected an option
    if (!selectedValue) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };


  return (
    <>
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <div className="wmnds-progress-indicator">
            Section {pageData.section} of 2
            <h4>About the issue</h4>
          </div>
          <h1 className="heading-2">{pageData.title}</h1>
          {pageData.options && (
            <Dropdown
              name="whats-reporting"
              options={pageData.options.map(option => ({
                label: option.label,
              }))}
              onSelectChange={handleSelectChange}
              preselectedValue={selectedValue}
              hasError={hasError}
              errorMessage={'Please select an option.'}
            />
          )}
          <ButtonCta label="Continue" onClick={() => redirect()} />
        </div>
      )}
    </>
  );
}

export default DropdownComponent;
