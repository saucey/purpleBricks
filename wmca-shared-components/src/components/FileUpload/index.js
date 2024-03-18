import React from 'react';

const FileUpload = ({ onFileUpload, onFileRemove, error, inmeg, multiple = false }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;

    // Check file size (example: 2MB limit)
    const fileSizeLimit = inmeg * 1024 * 1024; // Convert to bytes
    const filesToUpload = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].size > fileSizeLimit) {
        if (onFileUpload) {
          onFileUpload(null); // Notify the parent component that the file upload failed
        }
        return;
      }
      filesToUpload.push(files[i]);
    }

    if (onFileUpload) {
      onFileUpload(filesToUpload);
    }
  };

  const handleRemoveFile = () => {
    if (onFileRemove) {
      onFileRemove();
    }
  };

  return (
    <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
      {error && <span className="wmnds-fe-error-message">File must be less than {inmeg}mb</span>}
      <div className="wmnds-fe-file-upload">
        <input
          type="file"
          name="fileUploader"
          id="fileUploader"
          className="wmnds-fe-file-upload__input"
          onChange={handleFileChange}
          multiple={multiple} // Set multiple attribute based on props
        />
        <label
          htmlFor="fileUploader"
          className="wmnds-btn wmnds-btn--primary wmnds-fe-file-upload__label"
        >
          Choose file
          <svg className="wmnds-btn__icon wmnds-btn__icon--right">
            <use xlinkHref="#wmnds-general-paperclip" href="#wmnds-general-paperclip"></use>
          </svg>
        </label>
        <span>{/* No need to show selected files count */}</span>
      </div>
    </div>
  );
};

export { FileUpload };
