import React, { useState } from 'react';

const FileUpload = ({ onFileUpload, onFileRemove, selectedFile, error, inmeg }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check file size (example: 2MB limit)
    const fileSizeLimit = inmeg * 1024 * 1024; // 2MB
    if (file && file.size > fileSizeLimit) {
      if (onFileUpload) {
        onFileUpload(null); // Notify the parent component that the file upload failed
      }
      return;
    }

    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleRemoveFile = () => {
    if (onFileRemove) {
      onFileRemove();
    }
  };

  return (
    <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
      {error && <span className="wmnds-fe-error-message">File must be less than 2mb</span>}
      <div className="wmnds-fe-file-upload">
        <input
          type="file"
          name="fileUploader"
          id="fileUploader"
          className={`wmnds-fe-file-upload__input ${selectedFile ? 'wmnds-fe-file-upload__input--file-selected' : ''}`}
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileUploader"
          className="wmnds-btn wmnds-btn--primary wmnds-fe-file-upload__label"
          onClick={handleRemoveFile}
        >
          {selectedFile ? 'Remove file' : 'Choose file'}
          {/* trash icon or paper click icon based on selectedFile state */}
          <svg className="wmnds-btn__icon wmnds-btn__icon--right">
            <use xlinkHref={`#${selectedFile ? 'wmnds-general-trash' : 'wmnds-general-paperclip'}`} href={`#${selectedFile ? 'wmnds-general-trash' : 'wmnds-general-paperclip'}`}></use>
          </svg>
        </label>
        <span>{selectedFile ? selectedFile.name : 'no file selected'}</span>
      </div>
    </div>
  );
};

export {FileUpload};
