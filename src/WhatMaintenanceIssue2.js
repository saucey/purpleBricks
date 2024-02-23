import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { Radios, ButtonCta, TextInput, Checkboxes } from 'wmca-shared-components';

const WhatMaintenanceIssue2 = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(''); // Initial selected option

  const handleSelect = (value) => {
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
            What is the maintenance issue?
        </h1>
        <Checkboxes
          errorMessage="Custom error message goes here"
          onCheckboxChange={() => { }}
          options={[
            {
              checked: false,
              label: 'There is a build up of leaves',
              value: 'option1'
            },
            {
              checked: false,
              label: 'it has graffiti',
              value: 'option2'
            },
            {
              checked: false,
              label: 'There is smashed glass',
              value: 'option3'
            },
            {
              checked: false,
              label: 'There is litter',
              value: 'option1'
            },
            {
              checked: false,
              label: 'Fly tipping',
              value: 'option2'
            },
            {
              checked: false,
              label: 'It\'s overgrown or there are weeds',
              value: 'option3'
            },
            {
              checked: false,
              label: 'Trees need pruning',
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

export default WhatMaintenanceIssue2;
