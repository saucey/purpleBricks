import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { Radios, ButtonCta, TextInput, Checkboxes } from 'wmca-shared-components';

const WhatDamage = () => {
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
            What is the damaged?
        </h1>
        <Checkboxes
          errorMessage="Custom error message goes here"
          onCheckboxChange={() => { }}
          options={[
            {
              checked: false,
              label: 'The bus stop sign is damaged',
              value: 'option1'
            },
            {
              checked: false,
              label: 'Shelter framework is damaged',
              value: 'option2'
            },
            {
              checked: false,
              label: 'Glass panels are broken or missing',
              value: 'option3'
            },
            {
              checked: false,
              label: 'Shelter seats are damaged',
              value: 'option3'
            },
            {
              checked: false,
              label: 'Timetable case is damaged or missing',
              value: 'option3'
            },
            {
              checked: false,
              label: 'Advertising board is damaged',
              value: 'option3'
            },
            {
              checked: false,
              label: 'Drainage or flooding problem',
              value: 'option3'
            },
            {
              checked: false,
              label: 'Footway is in poor condition',
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

export default WhatDamage;
