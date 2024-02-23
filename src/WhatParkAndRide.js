import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { Radios, ButtonCta, TextInput, Checkboxes, Dropdown } from 'wmca-shared-components';

const WhatParkAndRide = () => {
  const navigate = useNavigate();

  const options = [
    { value: 'Blue', label: 'The Hawthrorns' },
    { value: 'Green', label: 'Wednesbury Parkway' },
    { value: 'Silver', label: 'Black Lake' },
    { value: 'Another colour', label: 'Bradley Lane' },
    { value: 'Another colour', label: 'Priestfield' },
  ];

  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');

  // State for error handling
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle changes in the dropdown selection
  const handleSelectChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    // Your custom validation logic can be placed here
    // For example, if you want to ensure the user has selected an option
    if (!selectedValue) {
      setHasError(true);
      setErrorMessage('Please select an option.');
    } else {
      setHasError(false);
      setErrorMessage('');
    }
  };


  return (
    <>
      <div class="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
        <div className="wmnds-progress-indicator">
          Section 1 of 2
          <h4>About the issue</h4>
        </div>
        <h1 className="heading-2">
            Which Park and Ride is the problem at?
        </h1>
        <Dropdown
          label="Select an option"
          id="dropdown"
          name="dropdown"
          options={options}
          hasError={hasError}
          errorMessage={errorMessage}
          onSelectChange={handleSelectChange}
        />
        {/* <p>Selected Value: {selectedValue}</p> */}
        <ButtonCta label="Continue" onClick={() => navigate('/incorrect-info')} />
        </div>
    </>
  );
}

export default WhatParkAndRide;
