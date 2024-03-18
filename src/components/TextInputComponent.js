import React, { useRef, useState, useContext, useEffect } from 'react';
import { FormDataContext } from '../globalState/FormDataContext';
import reportFormData from '../structure.json';
import { ButtonCta, TextInput, ButtonSecondary } from 'wmca-shared-components';
import MapSearch from '../shared/MapSearch';


const TextInputComponent = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, futureStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [validMap, setValidMap] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [getCoords, setCoords] = useState(null);
  const [errors, setErrors] = useState({});
  const [btnViewText, setBtnViewText] = useState("Map view");
  const [btnView, setBtnView] = useState(true);
  const errorMessageRef = useRef(null);

  useEffect(() => {
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);

    setInputValues({});
    if (currentPageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);

      if (matchingData && matchingData.coords) {
        setBtnView(false);
        setCoords(matchingData && matchingData.coords)
      } else {
        setBtnView(true);
        setCoords(null)
      }

      setInputValues(matchingData ? matchingData.inputValues : currentPageData.options.reduce((acc, option) => {
        acc[option.name] = '';
        return acc;
      }, {}));
    }
  }, [currentStep, formData]);


  useEffect(() => {
    if (!validMap && errorMessageRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validMap]);

  const redirect = (e, coords = null) => {
    if (!btnView) {
      if (coords === null) {
        setValidMap(false)
        return true
      } else {
        const payload = { inputValues, coords, pageId: pageData.id };
        let nextPage = currentStep === 2 ? formDataState.futureStep : pageData.nextId;
        if (formDataState.answerChecks) nextPage = 22;

        formDataDispatch({ type: 'UPDATE_STEP', payload: { nextStep: nextPage, currentStep } });
        formDataDispatch({ type: 'UPDATE_FORM_DATA', payload });
        setValidMap(true)
        return true
      }
    }

    const initialErrors = {};

    pageData.options.forEach(({ name, type }) => {
      const value = inputValues[name];
      const required = pageData.validation?.rules?.[name]?.required;
      if (required) initialErrors[name] = !value || !value.trim();
      if (type === 'email' && value) initialErrors[name] = !isValidEmail(value);
    });

    setErrors(initialErrors);

    if (Object.values(initialErrors).some(error => error)) return;

    const payload = { inputValues, pageId: pageData.id };
    let nextPage = currentStep === 2 ? formDataState.futureStep : pageData.nextId;
    if (formDataState.answerChecks) nextPage = 22;

    formDataDispatch({ type: 'UPDATE_STEP', payload: { nextStep: nextPage, currentStep } });
    formDataDispatch({ type: 'UPDATE_FORM_DATA', payload });
  };

  const handleInputChange = ({ target: { value } }, name, type) => {
    setInputValues({ ...inputValues, [name]: value });
    if (type === 'email' && value) setErrors(prevErrors => ({ ...prevErrors, [name]: !isValidEmail(value) }));
    else setErrors(prevErrors => ({ ...prevErrors, [name]: pageData.validation?.rules?.[name]?.required && (!value || !value.trim()) }));
  };

  const isValidEmail = email => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const toggleView = () => {
    setBtnView(btnView => !btnView);
  }

  const ErrorMessage = () => {
    return (
      <div ref={errorMessageRef} className="wmnds-msg-summary wmnds-msg-summary--error wmnds-m-b-lg">
        <div className="wmnds-msg-summary__header">
          <svg className="wmnds-msg-summary__icon">
            <use xlinkHref="#wmnds-general-warning-triangle" href="#wmnds-general-warning-triangle"></use>
          </svg>
          <h3 className="wmnds-msg-summary__title">Error message</h3>
        </div>
        <div className="wmnds-msg-summary__info">
          Please add a place or postcode
        </div>
      </div>
    );
  };



  return (
    pageData && (
      <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
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
            <ButtonSecondary label={ !btnView ? 'Map view': 'List view' } hasIcon icon="general-list" onClick={toggleView}/>
          </>
        )}

        <div className="wmnds-m-t-lg">
          {btnView ? (
            pageData.options.map(({ name, type, label }, index) => (
              <TextInput
                key={index}
                id={name}
                name={name}
                type={type || 'text'}
                label={<span dangerouslySetInnerHTML={{ __html: label }} />}
                errorMessage={errors[name] && (type === 'email' && inputValues[name] !== '' ? "Please enter a valid email address" : "This field is required")}
                isError={errors[name]}
                value={inputValues[name]}
                onChange={e => handleInputChange(e, name, type)}
                placeholder="Enter your value"
              />
            ))
          ) : (
              <>
                {!validMap && <ErrorMessage />}
                <MapSearch redirect={redirect} coords={getCoords} />  
              </>
          )}
        </div>
        {btnView && (
          <ButtonCta className={!btnView && 'btn-map-view'} label="Continue" onClick={redirect} />
        )}
      </div>
    )
  );
};

export default TextInputComponent;
