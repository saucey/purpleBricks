import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { ButtonCta, TextInput } from 'wmca-shared-components';

const ContactDetails = () => {
  const navigate = useNavigate()
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
          What are your contact details?
        </h1>

        <TextInput
          id="email" // Optional: provide a unique ID for the input
          name="email" // Required: provide a name for the input
          label={
            <>
              First name <br /> For example name@example.com
            </>
          } // Required: provide a label for the input
          errorMessage="Please enter a valid value" // Optional: error message to display when isError is true
          isError={false} // Optional: set to true if there's an error with the input
          value={inputValue} // Required: value of the input field
          onChange={handleInputChange} // Required: callback function triggered on input change
          placeholder="Enter your value" // Optional: placeholder text for the input field
        />

        <TextInput
          id="phone" // Optional: provide a unique ID for the input
          name="phone" // Required: provide a name for the input
          label={
            <>
              Phone number <br /> For example 07700900457
            </>
          } // Required: provide a label for the input
          errorMessage="Please enter a valid value" // Optional: error message to display when isError is true
          isError={false} // Optional: set to true if there's an error with the input
          value={inputValue} // Required: value of the input field
          onChange={handleInputChange} // Required: callback function triggered on input change
          placeholder="Enter your value" // Optional: placeholder text for the input field
        />
        <ButtonCta label="Continue" onClick={() => navigate('/answer-check')} />
        </div>
    </>
  );
}

export default ContactDetails;
