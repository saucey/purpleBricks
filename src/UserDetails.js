import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FormDataContext } from './globalState/FormDataContext';
import { ButtonCta, TextInput, FileUpload } from 'wmca-shared-components';

const UserDetails = () => {
  const navigate = useNavigate()

  const [formDataState, formDataDispatch] = useContext(FormDataContext);

  const redirect = () => {
    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: 5,
    });
  }
  const [inputValue, setInputValue] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
        <div className="wmnds-progress-indicator">
          Section 2 of 2
          <h4>About you</h4>
        </div>
        <h1 className="heading-2">
          What is your name?
        </h1>

        <TextInput
          id="firstName" // Optional: provide a unique ID for the input
          name="firstName" // Required: provide a name for the input
          label={
            <>
              First name
            </>
          } // Required: provide a label for the input
          errorMessage="Please enter a valid value" // Optional: error message to display when isError is true
          isError={false} // Optional: set to true if there's an error with the input
          value={inputValue} // Required: value of the input field
          onChange={handleInputChange} // Required: callback function triggered on input change
          placeholder="Enter your value" // Optional: placeholder text for the input field
        />

        <TextInput
          id="lastName" // Optional: provide a unique ID for the input
          name="lastName" // Required: provide a name for the input
          label={
            <>
              Last name
            </>
          } // Required: provide a label for the input
          errorMessage="Please enter a valid value" // Optional: error message to display when isError is true
          isError={false} // Optional: set to true if there's an error with the input
          value={inputValue} // Required: value of the input field
          onChange={handleInputChange} // Required: callback function triggered on input change
          placeholder="Enter your value" // Optional: placeholder text for the input field
        />

       

       
        <ButtonCta label="Continue" onClick={() => redirect()} />
        </div>
    </>
  );
}

export default UserDetails;
