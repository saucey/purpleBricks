import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { Radios, ButtonCta, TextInput, Checkboxes } from 'wmca-shared-components';

const WhatsWrongElectronics = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(''); // Initial selected option

  const handleSelect = (value) => {
    console.log(value)
    setSelectedOption(value);
  };


  return (
    <>
      <div class="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
        <div className="wmnds-progress-indicator">
          Section 1 of 2
          <h4>About the issue</h4>
        </div>
        <h1 className="heading-2">
            What is the electrical problem?
        </h1>
        <Checkboxes
          errorMessage="Custom error message goes here"
          onCheckboxChange={() => { }}
          options={[
            {
              checked: false,
              label: 'The screen is blank or not displaying any information',
              value: 'option1'
            },
            {
              checked: false,
              label: 'The prediction countdown is not accurate',
              value: 'option2'
            },
            {
              checked: false,
              label: 'Bus services on the display don\'t match a printed timetable',
              value: 'option3'
            },
          ]}
          title=""
        />
        <ButtonCta label="Continue" onClick={() => navigate('/incorrect-info')} />
        </div>
    </>
  );
}

export default WhatsWrongElectronics;