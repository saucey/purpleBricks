import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { Checkboxes } from 'wmca-shared-components';

const AnswerCheck = () => {
  const navigate = useNavigate();
  
  const terms = () => {
    return (<p>Agree to the <a href="#">terms and conditions</a></p>);
  }

  const policy = () => {
    return (<p>Agree to the <a href="#">privacy policy</a></p>);
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
                Where is the incorrect information
              </th>
              <td data-header="Header 2">
                Cell
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link'>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                What's wrong with the printed information
              </th>
              <td data-header="Header 2">
                Cell
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link'>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                Photo of the issue
              </th>
              <td data-header="Header 2">
                Cell
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link'>Change</button>
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
                Cell
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link'>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                Last name
              </th>
              <td data-header="Header 2">
                Cell
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link'>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                Email address
              </th>
              <td data-header="Header 2">
                Cell
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link'>Change</button>
              </td>
            </tr>
            <tr>
              <th scope="row" data-header="Header 1">
                Phone number
              </th>
              <td data-header="Header 2">
                Cell
              </td>
              <td className="wmnds-text-align-right">
                <button type='button' className='wmnds-btn wmnds-btn--link'>Change</button>
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
