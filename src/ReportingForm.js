import React, { useContext } from 'react';
import { FormDataContext } from './globalState/FormDataContext';
import RadioComponent from './components/RadioComponent';
import TextInputComponent from './components/TextInputComponent';
import UploadDetailsComponent from './components/UploadDetailsComponent';
import CheckboxComponent from './components/CheckboxComponent';
import DropdownComponent from './components/DropdownComponent';
import CheckboxMultipleComponent from './components/CheckboxMultipleComponent';
import AnswerCheckComponent from './components/AnswerCheckComponent';

const ReportingForm = () => {
  const [formDataState] = useContext(FormDataContext);
  const { currentStep } = formDataState;

  // useEffect(() => {
  //   console.log(currentStep, 'step');
  // }, [currentStep]);

  const components = {
    1: <RadioComponent />,
    2: <TextInputComponent />,
    3: <UploadDetailsComponent />,
    4: <TextInputComponent />,
    5: <TextInputComponent />,
    6: <CheckboxComponent />,
    7: <DropdownComponent />,
    8: <CheckboxComponent />,
    12: <CheckboxMultipleComponent />,
    13: <UploadDetailsComponent />,
    14: <CheckboxComponent />,
    15: <DropdownComponent />,
    18: <CheckboxComponent />,
    22: <AnswerCheckComponent />,
    // 9: <CheckboxComponent />,
    // 10: <CheckboxComponent />,
    // 11: <CheckboxComponent />,
  };

  return components[currentStep] || null;
};

export default ReportingForm;
