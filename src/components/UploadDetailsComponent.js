import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import reportFormData from '../structure.json';
import { ButtonCta, FormTextarea } from 'wmca-shared-components'; // Update import, removing FileUpload
import { FormDataContext } from '../globalState/FormDataContext';
import { FileUpload, ButtonDestructive } from 'wmca-shared-components'; // Import modified FileUpload component

const UploadDetailsComponent = () => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const { currentStep, formData } = formDataState;
  const [pageData, setPageData] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {

    // Filter the page data based on the current step ID
    const currentPageData = reportFormData.pages.find(page => page.id === currentStep);
    setPageData(currentPageData);
    // Initialize inputValues with data from formData
    if (pageData && formData.length > 0) {
      const matchingData = formData.find(data => data.pageId === currentStep);
      if (matchingData) {
        setTextareaValue(matchingData.textareaValue);
        setPreviewImages(matchingData.photos)
      }
    } else {
      // If no formData or pageData, set inputValues to empty object
      setTextareaValue('');
      setPreviewImages([]);
    }
  }, [currentStep, formData, pageData]);

  const redirect = () => {
    const payload = {
      textareaValue,
      photos: previewImages,
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

  // State to manage selected files
  const [error, setError] = useState(false);

  // Function to handle file upload
  const handleFileUpload = (files) => {
    files === null ? setError(true) : setError(false);
    if (files && files.length > 0) {
      const newImages = [];

      // Recursive function to handle reading files sequentially
      const readNextFile = (index) => {
        if (index >= files.length) {
          // All files have been processed
          setPreviewImages([...previewImages, ...newImages]); // Update preview images array
          return;
        }

        const file = files[index];
        const reader = new FileReader();

        // Event listener for when file reading is complete
        reader.onload = (e) => {
          newImages.push({ content: e.target.result, name: file.name }); // Push base64 string and file name into array
          readNextFile(index + 1); // Read the next file
        };

        // Event listener for when an error occurs during file reading
        reader.onerror = (e) => {
          setError(true); // Set error state if an error occurs
          readNextFile(index + 1); // Move to the next file even if an error occurs
        };

        // Start reading the file as data URL
        reader.readAsDataURL(file);
      };

      // Start reading the first file
      readNextFile(0);
    }
  };

  // Function to handle file removal
  const handleFileRemove = (index) => {
    const newImages = [...previewImages];
    newImages.splice(index, 1); // Remove the selected image from the array
    setPreviewImages(newImages); // Update the preview images array
  };

  return (
    <>
      {pageData && (
        <div className="wmnds-col-1 wmnds-p-lg wmnds-bg-white">
          <h3>{pageData.id}</h3>
          <div className="wmnds-progress-indicator">
            Section {pageData.section} of 2
            <h4>About the issue</h4>
          </div>
          <h1 className="heading-2">{pageData.title}</h1>
          <FormTextarea
            id="issue-details"
            name="issue-details"
            label="Details of the issue"
            errorMessage="Please enter a valid value"
            isError={false}
            value={textareaValue}
            onChange={handleTextareaChange}
            placeholder="Enter your text"
          />
          <h4>Photos of the issue</h4>
          <p>Files must be jpeg or png file format</p>
          <div className="preview-images">
            {previewImages.map((image, index) => (
              <div key={index} className="preview-image">
                <ButtonDestructive hasIcon icon={"general-trash"} label="Remove file" onClick={() => handleFileRemove(index)} />
                <span className="wmnds-m-l-md">{image.name}</span>
                <div>
                  <img className="wmnds-m-t-md wmnds-m-b-lg" src={image.content} alt={`Preview ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
          <FileUpload
            onFileUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
            multiple={true} // Allow multiple file uploads
            error={error}
            inmeg={2}
          />
          <ButtonCta label="Continue" onClick={redirect} />
        </div>
      )}
    </>
  );
}

export default UploadDetailsComponent;
