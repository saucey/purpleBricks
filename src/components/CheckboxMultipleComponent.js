import { useState, useContext, useEffect } from 'react';
import reportFormData from '../structure.json';
import { FormDataContext } from '../globalState/FormDataContext';

import { ButtonCta, Checkboxes } from 'wmca-shared-components';

const CheckboxMultipleComponent = () => {
  // const navigate = useNavigate();
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData } = formDataState;
  const [pageData, setPageData] = useState([]);
  const [checkBoxData, setCheckBoxData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sectionErrors, setSectionErrors] = useState({});

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

  useEffect(() => {
    // Function to find the matching object
    const findMatchingPages = () => {
      const matchedPagesArray = [];
      for (const page of reportFormData.pages) {
        if (formDataState.futureStep.includes(page.id)) {
          matchedPagesArray.push(page);
        }
      }
      setCheckBoxData(matchedPagesArray);
    };
    // Call the function to find the matching object
    findMatchingPages();
  }, []);


  const handleCheckboxChange = (value, isChecked) => {

    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]); // Add the value to selectedOptions
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value)); // Remove the value from selectedOptions
    }
  };

  const redirect = () => {

    const errors = {};
    checkBoxData.forEach(page => {
      if (!selectedOptions.some(option => page.options.map(opt => opt.label.value).includes(option))) {
        errors[page.id] = true;
      }
    });
    setSectionErrors(errors);

    if (Object.values(errors).some(error => error)) {
      return;
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

    if (formDataState.answerChecks) {
      nextPage = 22
    }

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: nextPage, currentStep: currentStep }, // Increment the current step
    });
  };


  return (
    <>
      <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
        <div className="wmnds-progress-indicator">
          Section 1 of 2
          <h4>About the issue</h4>
        </div>
        {checkBoxData.map(page => (
          <>
            <h1 className="heading-2">{page.title}</h1>
            {page.options && (
              <Checkboxes
                key={page.id}
                onCheckboxChange={handleCheckboxChange}
                options={page.options.map(option => ({
                  label: option.label.name,
                  value: option.label.value,
                  checked: selectedOptions.includes(option.label.value),
                }))}
                hasError={sectionErrors[page.id]}
                errorMessage={sectionErrors[page.id] && 'Please select your options'}
              />
            )}
          </>
        ))}        
        <ButtonCta label="Continue" onClick={redirect} /> {/* Render the button outside of the loop */}
      </div>
    </>
  );
};

export default CheckboxMultipleComponent;
