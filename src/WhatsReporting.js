import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FormDataContext } from './globalState/FormDataContext';
import { Radios, ButtonCta } from 'wmca-shared-components';
import reportFormData from './structure.json';

const WhatsReporting = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(''); // Initial selected option
  const navigate = useNavigate();

  useEffect(() => {
    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);

    console.log(currentPageData, 'data')
  }, [currentStep]);

  const handleSelect = (value) => {
    console.log(value)
    setSelectedOption(value);
  };

  const redirect = () => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: 2, // Increment the current step
    });
  };

  return (
    <>
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <h1 className="heading-2">{pageData.title}</h1>
          { pageData.options && (
            <Radios
              name="whats-reporting"
              descriptionText=""
              defaultSelected={selectedOption}
              onSelect={handleSelect}
              options={pageData.options.map(option => ({
                label: option.label,
                name: option.name,
                value: option.label // Use label as value
              }))}
            />
          )}
          <ButtonCta label="Continue" onClick={redirect} />
        </div>
      )}
    </>
  );
};

export default WhatsReporting;
