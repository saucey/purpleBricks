import { useState, useContext, useEffect } from 'react';
import '../App.css';
import { FormDataContext } from '../globalState/FormDataContext';
import reportFormData from '../structure.json';
import { Checkboxes } from 'wmca-shared-components';
import MapReview from '../shared/MapReview';

const AnswerCheck = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData, previousSteps } = formDataState;
  const [reporting, setReporting] = useState({}); 


  useEffect(() => {
    let newReporting = {};
    console.log(formData, 'final')
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
            const matchingIssues = reportFormData.pages.filter(page => item.selectedOptions?.includes(page.id));
            newReporting['issue2'] = { ...newReporting['issue2'], title: selectPage?.title, answer: matchingSelectors.map(ex => ex.label.name), pageId: item.pageId };
            newReporting['issue3'] = { ...newReporting['issue3'], matchingIssues };
            break;
          case 12:
            if (newReporting['issue3'] && newReporting['issue3'].matchingIssues) {
              const filteredArray = newReporting['issue3'].matchingIssues.map(section => ({
                ...section,
                options: item.selectedOptions.length === 0 ? [] : section.options.filter(option => item.selectedOptions.includes(option.label.name))
              }));
              const finalFilteredArray = item.selectedOptions.length === 0 ? filteredArray : filteredArray.filter(section => section.options.length > 0);
              newReporting['issue3'] = { ...newReporting['issue3'], matchingIssues: finalFilteredArray, pageId: item.pageId };
            } else {
              console.error("newReporting['issue3'] or newReporting['issue3'].matchingIssues is undefined or null");
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

  const options = [
    { label: policy(), value: 'option1', checked: true },
    { label: terms(), value: 'option2', checked: true }, // Using the terms component as label
  ];

  // State to manage the selected checkboxes
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handler function to update selected checkboxes
  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

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

  return (
    <>
      <div className="wmnds-bg-white wmnds-p-lg">
        <h1 className="wmnds-fe-question">
          Check your answers
        </h1>

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
                    <img className="wmnds-m-t-md wmnds-m-b-lg" src={image} alt={`Preview ${index + 1}`} />
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
          options={options}
          onCheckboxChange={handleCheckboxChange}
        />

            <button className="wmnds-btn wmnds-btn--start" type="button">
              Accept and send
              <svg className="wmnds-btn__icon wmnds-btn__icon--right ">
                <use xlinkHref="#wmnds-general-chevron-right" href="#wmnds-general-chevron-right"></use>
              </svg>
            </button>
          </div>
    </>
  );
}

export default AnswerCheck;
