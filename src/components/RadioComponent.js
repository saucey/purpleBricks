import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormDataContext } from '../globalState/FormDataContext';
import { Radios, ButtonCta } from 'wmca-shared-components';
import reportFormData from '../structure.json';

const RadioComponent = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(''); // Initial selected option
  const navigate = useNavigate();

  useEffect(() => {
    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);

  }, [currentStep]);

  const handleSelect = (value) => {
    console.log(value)
    setSelectedOption(value);
  };

  const redirect = () => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: selectedOption?.skip ? selectedOption?.nextId : pageData?.nextId, currentStep: currentStep, futureStep: selectedOption.nextId }, // Increment the current step
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
