import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import reportFormData from '../structure.json';
import { ButtonCta, FormTextarea, FileUpload } from 'wmca-shared-components';
import { FormDataContext } from '../globalState/FormDataContext';

const UploadDetailsComponent = () => {
  const navigate = useNavigate();
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);  
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);
    // Initialize inputValues with data from formData
    if (pageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);
      if (matchingData) {
        setTextareaValue(matchingData.textareaValue);
      } 
    } else {
      // If no formData or pageData, set inputValues to empty object
      setTextareaValue('');
    }
  }, [currentStep, formData, pageData]);

  const redirect = () => {

    const payload = {
      textareaValue,
      "pageId": pageData.id
    }

    let nextPage = pageData?.nextId

    if (formDataState.answerChecks) {
      nextPage = 22
    }

    formDataDispatch({
      type: 'UPDATE_FORM_DATA',
      payload
    });

    formDataDispatch({
      type: 'UPDATE_STEP',
      payload: { nextStep: nextPage, currentStep: currentStep },
    });
  }


  // Function to handle textarea change
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  // State to manage selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // State to manage error
  const [error, setError] = useState(false);

  // Function to handle file upload
  const handleFileUpload = (file) => {
    if (file) {
      setSelectedFile(file);
      setError(false); // Reset error state
    } else {
      setError(true); // Set error state if file size exceeds limit
    }
  };

  // Function to handle file removal
  const handleFileRemove = () => {
    setSelectedFile(null); // Reset selected file
    setError(false); // Reset error state
  };

  return (
    <>
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <h1>{currentStep}</h1>

          <div className="wmnds-progress-indicator">
              Section {pageData.section} of 2
            <h4>About the issue</h4>
          </div>
          <h1 className="heading-2">
            {pageData.title}
          </h1>
       
          <FormTextarea
            id="issue-details" // Required: provide a unique ID for the textarea
            name="issue-details" // Required: provide a name for the textarea
            label="Details of the issue" // Required: provide a label for the textarea
            errorMessage="Please enter a valid value" // Optional: error message to display when isError is true
            isError={false} // Optional: set to true if there's an error with the textarea
            value={textareaValue} // Required: value of the textarea field
            onChange={handleTextareaChange} // Required: callback function triggered on textarea change
            placeholder="Enter your text" // Optional: placeholder text for the textarea field
          />

          <h4>Photo of the issue</h4>
          <p>File must be jpeg or png file format</p>

          <FileUpload
            onFileUpload={handleFileUpload} // Required: callback function triggered on file upload
            onFileRemove={handleFileRemove} // Required: callback function triggered on file removal
            selectedFile={selectedFile} // Required: selected file
            error={error} // Required: boolean indicating error state
            inmeg={2} // Optional: file size limit in megabytes
          />
          <ButtonCta label="Continue" onClick={() => redirect()} />
        </div>
      )}
    </>
  );
}

export default UploadDetailsComponent;
