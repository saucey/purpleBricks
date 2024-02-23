import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reportFormData from '../structure.json';
import { FormDataContext } from '../globalState/FormDataContext';

import { Radios, ButtonCta, TextInput, Checkboxes } from 'wmca-shared-components';

const CheckboxMultipleComponent = () => {
  const navigate = useNavigate();
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep } = formDataState;
  const [pageData, setPageData] = useState([]);
  const [checkBoxData, setCheckBoxData] = useState([]);

  useEffect(() => {
    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);

  }, [currentStep]);

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

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]); // Add the value to selectedOptions
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value)); // Remove the value from selectedOptions
    }
  };

  const redirect = () => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: pageData?.nextId, currentStep: currentStep, futureStep: selectedOptions }, // Increment the current step
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
                }))}
              />
            )}
          </>
        ))}
            <ul>
              {selectedOptions.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
        
        <ButtonCta label="Continue" onClick={redirect} /> {/* Render the button outside of the loop */}
      </div>
    </>
  );
};

export default CheckboxMultipleComponent;
