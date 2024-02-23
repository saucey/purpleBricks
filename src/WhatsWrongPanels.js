import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { Radios, ButtonCta, TextInput, Checkboxes } from 'wmca-shared-components';

const WhatsWrongPanels = () => {
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
            What's wrong with the panels?
        </h1>
        <Checkboxes
          errorMessage="Custom error message goes here"
          onCheckboxChange={() => { }}
          options={[
            {
              checked: false,
              label: 'Glass panel is smashed',
              value: 'option1'
            },
            {
              checked: false,
              label: 'Missing or damaged plastic panel',
              value: 'option2'
            },
          ]}
          title=""
        />
        <ButtonCta label="Continue" onClick={() => navigate('/incorrect-info')} />
        </div>
    </>
  );
}

export default WhatsWrongPanels;
