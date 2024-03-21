import { useState, useContext, useEffect, useRef } from 'react';
import '../App.css';
import { FormDataContext } from '../globalState/FormDataContext';
import reportFormData from '../structure.json';
import { Checkboxes, ButtonStart } from 'wmca-shared-components';
import MapReview from '../shared/MapReview';
import { useNavigate } from 'react-router-dom';

const AnswerCheck = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData, previousSteps } = formDataState;
  const [reporting, setReporting] = useState({}); 
  const [error, setError] = useState(null); 
  const errorMessageRef = useRef(null);
  const matchingIssuesRef = useRef([]);
  const navigate = useNavigate()


  useEffect(() => {

    let newReporting = {};
    formData
      .filter(item => previousSteps.includes(item.pageId))
      .map(item => {
        const selectPage = reportFormData.pages.find(page => page.id === item.pageId);
        switch (item.pageId) {
          case 6:
          case 7:
            newReporting['issue'] = { ...newReporting['issue'], answer: item.selectedOptions || [item.selectedValue], pageId: item.pageId, title: selectPage?.title };
            break;
          case 8:
          case 14:
          case 18:
            const matchingSelectors = selectPage.options.filter(opt => item.selectedOptions?.includes(opt.label.value));
            matchingIssuesRef.current = reportFormData.pages.filter(page => item.selectedOptions?.includes(page.id));
            newReporting['issue2'] = { ...newReporting['issue2'], title: selectPage?.title, answer: matchingSelectors.map(ex => ex.label.name), pageId: item.pageId };
            newReporting['issue3'] = { ...newReporting['issue3'], matchingIssues: matchingIssuesRef.current };
            break;
          case 12:
            if (!newReporting['issue3']) {
              newReporting['issue3'] = {}; // Initialize issue3 if it doesn't exist
            }

            if (newReporting['issue3'] && (matchingIssuesRef.current || newReporting['issue3']?.matchingIssues)) {

              const matchingIssues = matchingIssuesRef.current || newReporting['issue3']?.matchingIssues;

              const filteredArray = matchingIssues.map(section => ({
                ...section,
                options: item.selectedOptions.length === 0 ? [] : section.options.filter(option => item.selectedOptions.includes(option.label.name))
              }));

              const finalFilteredArray = item.selectedOptions.length === 0 ? filteredArray : filteredArray.filter(section => section.options.length > 0);

              newReporting['issue3'] = { ...newReporting['issue3'], matchingIssues: finalFilteredArray, pageId: item.pageId };
            }
            break;
          case 13:
          case 3:
            newReporting['info'] = { ...newReporting['info'], title: selectPage?.title, details: item.textareaValue, photos: item.photos, pageId: item.pageId };
            break;
          case 15:
            newReporting['where'] = { ...newReporting['where'], title: selectPage?.title, location: item.selectedValue, pageId: item.pageId };
            break;
          case 2:
            newReporting['where'] = { ...newReporting['where'], title: selectPage?.title2, address: { town: item.inputValues.town, street: item.inputValues.street, direction: item.inputValues.direction, number: item.inputValues.number }, coords: item.coords, pageId: item.pageId };
            break;         
          case 5:
            newReporting['contact'] = { ...newReporting['contact'], email: item.inputValues.email || "", phone: item.inputValues.phone || "", pageId: item.pageId };
            break;
          case 4:
            newReporting['personal'] = { ...newReporting['personal'], firstName: item.inputValues.firstName || "", lastName: item.inputValues.lastName || "", pageId: item.pageId };
            break;
          default:
            break;
        }
        return { ...item };
      });
    
    setReporting(newReporting);
  }, [currentStep, formData, previousSteps]);
  
  const terms = () => {
    return (<p>Agree to the <a href="https://www.tfwm.org.uk/terms-and-conditions/" target="_blank" rel="noreferrer">terms and conditions</a></p>);
  }

  const policy = () => {
    return (<p>Agree to the <a href="https://www.tfwm.org.uk/policies/" target="_blank" rel="noreferrer">privacy policy</a></p>);
  }

  // State to manage the selected checkboxes
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);

  // Handler function to update selected checkboxes
  const handleCheckboxChange = (value, isChecked) => {
    if (value === 'option1') {
      setCheckbox1Checked(isChecked);
    } else if (value === 'option2') {
      setCheckbox2Checked(isChecked);
    }
  };

  const isSubmitDisabled = !(checkbox1Checked && checkbox2Checked);

  const redirect = (pageId) => {

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: pageId, currentStep: currentStep, }
    });

    formDataDispatch({
      type: 'REACHED_ANSWER_CHECKS',
      payload: { answerChecks: true },
    });
  };

  const acceptAndSend = () => {

    let matchingIssues;
    if (reporting.issue3 && reporting.issue3.matchingIssues) { // Check if reporting.issue3 and matchingIssues exist
      matchingIssues = reporting.issue3.matchingIssues.reduce((result, item) => {
        // Extract the title and options array from each item
        const { title, options } = item;
        // Extract the names from the options array and join them with '&'
        const optionNames = options.map(option => option.label.name).join(' & ');
        // Set the title as the key and the joined option names as the value in the result object
        result[title] = optionNames;
        return result;
      }, {});
    } 

    let where;
    if (reporting.where.address && reporting.where.coords === undefined) {
      let htmlString = '<p>';
      for (const key in reporting.where.address) {
        if (reporting.where.address.hasOwnProperty(key)) {
          htmlString += `<strong>${key}:</strong> ${reporting.where.address[key]}<br>`;
        }
      }
      htmlString += '</p>';
      where = htmlString
    } else if (reporting.where.location) {
      where = reporting.where.location
    } else {
      const longitude = reporting.where.coords.longitude
      const latitude = reporting.where.coords.latitude
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      where = `<a href="${url}">${url}</a>`;
    }

    const bodyPrep = {};

    if (reporting.where) {
      bodyPrep[reporting.where.title] = where;
    }

    if (reporting.info) {
      bodyPrep[reporting.info.title] = reporting.info.details;
    }

    if (reporting.issue) {
      bodyPrep[reporting.issue.title] = reporting.issue.answer.join(" ");
    }

    if (reporting.issue2) {
      bodyPrep[reporting.issue2.title] = reporting.issue2.answer.join(" ");
    }

    let body = bodyPrep

    if (matchingIssues !== undefined) {
      body = { ...bodyPrep, ...matchingIssues };
    }


    let modifiedImages = []
    if (reporting.info?.photos) {
      modifiedImages = reporting.info?.photos.map(image => ({
        ...image,
      content: image.content.replace(/^data:image\/(png|jpg|jpeg);base64,/, '') // Remove prefix
      }));
    }


    body = JSON.stringify(body, null, 2)

    const payload = {
      "to": 7,
      "body": body,
      "from": reporting.contact.email,
      "subject": "Reporting issue",
      "files": modifiedImages,
      "displayName": `${reporting.personal.firstName} ${reporting.personal.lastName}`
    }

    const data = JSON.stringify(payload)

    // Perform the API POST request
    fetch('https://internal-api.wmca.org.uk/emails/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: data
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Email sent successfully:', data);
        setError(null)

        formDataDispatch({
          type: 'ANSWER_CHECKS_SUBMITTED',
          payload: { answerChecksSubmitted: true, }
        });
        
        navigate('/reporting-complete')
      })
      .catch(error => {
        setError('Problem sending you form')
        console.error('Error sending email:', error);
      });

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
          {error}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (error !== null && errorMessageRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  return (
    <>
      <div className="wmnds-bg-white wmnds-p-lg">
        <h1 className="wmnds-fe-question">
          Check your answers
        </h1>
        {error !== null && <ErrorMessage />}
        <table className="wmnds-table wmnds-m-b-xl wmnds-table--without-header">
          <h3>
            About the issue
          </h3>
          <tbody>
            <tr>
              <th scope="row" data-header="Header 1">
                {reporting.where?.title}
              </th>
              <td data-header="Header 2" className={reporting.where?.coords && 'mapContainer'}>
                {!reporting.where?.coords && (
                  <>
                    {reporting.where?.location}<br />
                    {reporting.where?.address?.town}<br />
                    {reporting.where?.address?.street}<br />
                    {reporting.where?.address?.direction}<br />
                    {reporting.where?.address?.number}
                  </>
                )}

                {reporting.where?.coords && (
                  <MapReview lat={reporting.where?.coords.latitude} long={reporting.where?.coords.longitude} />
                )}
                
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.where.pageId)}>Change</button>
              </td>
            </tr>

            {reporting.issue &&
              <tr>
                <th scope="row" data-header="Header 1">
                  {reporting.issue?.title}
                </th>
                <td data-header="Header 2">
                  <p>
                    {reporting.issue?.answer.map(val => (
                      <><br /><br />{val}</>
                    ))}
                  </p>
                </td>
                <td className="wmnds-text-align-right">
                  <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.issue.pageId)}>Change</button>
                </td>
              </tr>
            }

            {reporting.issue2 && 
              <tr>
                <th scope="row" data-header="Header 1">
                  {reporting.issue2?.title}
                </th>
                <td data-header="Header 2">
                  <p>
                    {reporting.issue2?.answer.map(val => (
                      <><br /><br />{val}</>
                      ))}
                  </p>
                </td>
                <td className="wmnds-text-align-right">
                  <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.issue2.pageId)}>Change</button>
                </td>
              </tr>
            }

            {reporting.issue3?.matchingIssues.map(val => (
              <tr>
                <th scope="row" data-header="Header 1">
                  <p>{val?.title}</p>
                </th>
                <td data-header="Header 2">
                  <p>
                    {val?.options.map(opt => (
                      <><br />{opt.label.value}</>
                      ))}
                  </p>
                </td>
                <td className="wmnds-text-align-right">
                  <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.issue3?.pageId)}>Change</button>
                </td>
              </tr>
            ))}

            <tr>
              <th scope="row" data-header="Header 1">
                {reporting.info?.title}
              </th>
              <td data-header="Header 2">
                {reporting.info?.details}
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.info.pageId)}>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1" style={{verticalAlign: 'unset'}}>
                Photo of the issue
              </th>
              <td data-header="Header 2">
                {reporting.info?.photos.map((image, index) => (
                  <div key={index} className="preview-image">
                    <p className="wmnds-m-b-sm">{image.name}</p>
                    <img className="wmnds-m-b-lg" src={image.content} alt={`Preview ${index + 1}`} />
                  </div>
                ))} 
              </td>
              <td className="wmnds-text-align-right" style={{ verticalAlign: 'unset' }}>
                <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.info.pageId)}>Change</button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="wmnds-table wmnds-m-b-xl wmnds-table--without-header">
          <h3>
            About you
          </h3>
          <tbody>
            <tr>
              <th scope="row" data-header="Header 1">
                First name
              </th>
              <td data-header="Header 2">
                {reporting.personal?.firstName}
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.personal?.pageId)}>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                Last name
              </th>
              <td data-header="Header 2">
                {reporting.personal?.lastName}
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.personal?.pageId)}>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                Email address
              </th>
              <td data-header="Header 2">
                {reporting.contact?.email}
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.contact?.pageId)}>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                Phone number
              </th>
              <td data-header="Header 2">
                {reporting.contact?.phone}
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link' onClick={() => redirect(reporting.contact?.pageId)}>Change</button>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Now send your request</h3>
        <p>By submitting this request you are confirming that, to the best of your knowledge, the details you are providing are correct.</p>
        <Checkboxes
          title=""
          options={[
            { label: policy(), value: 'option1', checked: checkbox1Checked },
            { label: terms(), value: 'option2', checked: checkbox2Checked },
          ]}
          onCheckboxChange={handleCheckboxChange}
        />

        <ButtonStart label={"Accept and send"} hasIcon isDisabled={isSubmitDisabled} onClick={acceptAndSend}/>

      </div>
    </>
  );
}

export default AnswerCheck;
