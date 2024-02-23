import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import reportFormData from '../structure.json';
import { FormDataContext } from '../globalState/FormDataContext';

import { Radios, ButtonCta, TextInput, Checkboxes, Dropdown } from 'wmca-shared-components';

const DropdownComponent = () => {
  const navigate = useNavigate();

  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep } = formDataState;
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);

  }, [currentStep]);

  const redirect = () => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: pageData?.nextId, currentStep: currentStep }, // Increment the current step
    });
  };


  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');

  // State for error handling
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle changes in the dropdown selection
  const handleSelectChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    // Your custom validation logic can be placed here
    // For example, if you want to ensure the user has selected an option
    if (!selectedValue) {
      setHasError(true);
      setErrorMessage('Please select an option.');
    } else {
      setHasError(false);
      setErrorMessage('');
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
            />
          )}
          <ButtonCta label="Continue" onClick={() => redirect()} />
        </div>
      )}
    </>
  );
}

export default DropdownComponent;
