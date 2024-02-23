'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ButtonCta = ({
  label,
  isActive,
  isDisabled,
  hasIcon,
  isLoading,
  isDarkBg,
  onClick
}) => {
  const buttonClasses = ['wmnds-btn'];
  if (isActive) buttonClasses.push('wmnds-is--active');
  if (isDisabled) buttonClasses.push('wmnds-btn--disabled');
  if (isDarkBg) buttonClasses.push('wmnds-btn--dark-bg');
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: buttonClasses.join(' '),
    type: "button",
    disabled: isDisabled,
    onClick: onClick
  }, label, hasIcon && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--right",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#wmnds-general-chevron-right",
    href: "#wmnds-general-chevron-right"
  })), isLoading && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right",
    role: "alert",
    "aria-live": "assertive"
  }, /*#__PURE__*/React__default["default"].createElement("p", {
    className: "wmnds-loader__content"
  }, "Content is loading...")));
};

const ButtonDestructive = ({
  label,
  isActive,
  isDisabled,
  hasIcon
}) => {
  // Define the base class
  let buttonClass = 'wmnds-btn wmnds-btn--destructive';

  // Add additional classes based on props
  if (isActive) {
    buttonClass += ' wmnds-is--active';
  }
  if (isDisabled) {
    buttonClass += ' wmnds-btn--disabled';
  }
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: buttonClass,
    disabled: isDisabled,
    type: "button"
  }, label, hasIcon && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--right",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#wmnds-general-chevron-right",
    href: "#wmnds-general-chevron-right"
  })));
};

const ButtonFavorite = ({
  label,
  isFavorited
}) => {
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: "wmnds-btn wmnds-btn--favourite",
    type: "button"
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--left",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: isFavorited ? '#wmnds-general-star' : '#wmnds-general-star-empty',
    href: isFavorited ? '#wmnds-general-star' : '#wmnds-general-star-empty'
  })), label);
};

const ButtonLink = ({
  label
}) => {
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: "wmnds-btn wmnds-btn--link",
    type: "button"
  }, label);
};

const ModeButton = ({
  label,
  icon,
  isActive,
  isDisabled
}) => {
  // Define the base class
  let buttonClass = 'wmnds-btn wmnds-btn--mode';

  // Add additional classes based on props
  if (isActive) {
    buttonClass += ' wmnds-is--active';
  }
  if (isDisabled) {
    buttonClass += ' wmnds-btn--disabled';
  }
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: buttonClass,
    disabled: isDisabled,
    type: "button"
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--left",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: icon,
    href: icon
  })), label);
};

const ButtonOpenClose = ({
  label,
  isClose
}) => {
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: `wmnds-btn wmnds-btn--primary ${isClose ? 'wmnds-m-l-xs' : ''}`,
    type: "button"
  }, label);
};

// ButtonPayment.js
const ButtonPayment = ({
  label,
  isActive,
  isDisabled,
  hasRightIcon
}) => {
  const buttonClass = `wmnds-btn wmnds-btn--primary${isActive ? ' wmnds-is--active' : ''}${isDisabled ? ' wmnds-btn--disabled' : ''}`;
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: buttonClass,
    type: "button",
    disabled: isDisabled
  }, label, " ", /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-swift-logo-inline",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#wmnds-swift-full-logo",
    href: "#wmnds-swift-full-logo"
  })), hasRightIcon && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--right",
    "data-testid": "svg-component-right-icon"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#wmnds-general-chevron-right",
    href: "#wmnds-general-chevron-right"
  })));
};

const ButtonPrimary = ({
  label,
  isActive,
  isDisabled,
  hasIcon
}) => {
  const buttonClasses = ['wmnds-btn', 'wmnds-btn--primary'];
  if (isActive) buttonClasses.push('wmnds-is--active');
  if (isDisabled) buttonClasses.push('wmnds-btn--disabled');
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: buttonClasses.join(' '),
    type: "button",
    disabled: isDisabled
  }, label, hasIcon && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--right",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#wmnds-general-chevron-right",
    href: "#wmnds-general-chevron-right"
  })));
};

const SecondaryButton = ({
  label,
  isActive,
  isDisabled,
  hasIcon,
  isDarkBg,
  icon,
  className
}) => {
  const buttonClasses = ['wmnds-btn', 'wmnds-btn--secondary'];
  if (className) buttonClasses.push(className);
  if (isDarkBg) buttonClasses.push('wmnds-btn--dark-bg');
  if (isActive) buttonClasses.push('wmnds-is--active');
  if (isDisabled) buttonClasses.push('wmnds-btn--disabled');
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: buttonClasses.join(' '),
    type: "button",
    disabled: isDisabled
  }, label, hasIcon && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--right",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: `#wmnds-${icon}`,
    href: `#wmnds-${icon}`
  })));
};

const ButtonStart = ({
  label,
  isActive,
  isDisabled,
  hasIcon,
  onClick
}) => {
  // Define the base class
  let buttonClass = 'wmnds-btn wmnds-btn--start';

  // Add additional classes based on props
  if (isActive) {
    buttonClass += ' wmnds-is--active';
  }
  if (isDisabled) {
    buttonClass += ' wmnds-btn--disabled';
  }
  return /*#__PURE__*/React__default["default"].createElement("button", {
    className: buttonClass,
    disabled: isDisabled,
    type: "button",
    onClick: onClick
  }, label, hasIcon && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--right",
    "data-testid": "svg-component"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#wmnds-general-chevron-right",
    href: "#wmnds-general-chevron-right"
  })));
};

// import PropTypes from 'prop-types';

const Radios = ({
  name,
  options,
  inline,
  error,
  defaultSelected,
  errorMessage,
  descriptionText,
  onSelect
}) => {
  const groupClass = `wmnds-fe-group${error ? ' wmnds-fe-group--error' : ''}`;
  const radiosClass = `wmnds-fe-radios${inline ? ' wmnds-fe-radios--inline' : ''}`;
  const handleSelect = value => {
    onSelect(value);
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: groupClass
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: radiosClass,
    role: "radiogroup"
  }, error && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-error-message"
  }, errorMessage || 'Please select an option'), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-radios__desc"
  }, descriptionText || 'Select all options that apply'), options.map((option, index) => /*#__PURE__*/React__default["default"].createElement("label", {
    key: index,
    className: "wmnds-fe-radios__container"
  }, option.label, /*#__PURE__*/React__default["default"].createElement("input", {
    className: "wmnds-fe-radios__input",
    value: option.value,
    checked: JSON.stringify(defaultSelected) === JSON.stringify(option.value),
    name: name,
    type: "radio",
    onChange: () => handleSelect(option.value)
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-radios__checkmark"
  })))));
};

// Radios.propTypes = {
//   name: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   inline: PropTypes.bool,
//   error: PropTypes.bool,
//   defaultSelected: PropTypes.string,
//   errorMessage: PropTypes.string,
//   descriptionText: PropTypes.string,
//   onSelect: PropTypes.func.isRequired, // Callback function to handle selection
// };

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// import PropTypes from 'prop-types';

const TextInput = ({
  id,
  name,
  label,
  errorMessage,
  isError,
  value,
  onChange,
  ...inputProps
}) => {
  const defaultId = name;
  const finalId = id || defaultId;
  const groupClass = `wmnds-fe-group${isError ? ' wmnds-fe-group--error' : ''}`;
  const inputClass = `wmnds-fe-input${isError ? ' wmnds-fe-input--error' : ''}`;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: groupClass
  }, /*#__PURE__*/React__default["default"].createElement("label", {
    className: "wmnds-fe-label",
    htmlFor: finalId
  }, label), isError && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-error-message"
  }, errorMessage), /*#__PURE__*/React__default["default"].createElement("input", _extends({
    className: inputClass,
    id: finalId,
    name: name,
    type: "text",
    value: value,
    onChange: onChange
  }, inputProps)));
};

// import PropTypes from 'prop-types';

const FormTextarea = ({
  id,
  name,
  label,
  errorMessage,
  isError,
  onChange,
  ...textareaProps
}) => {
  const defaultId = name;
  const finalId = id || defaultId;
  const groupClass = `wmnds-fe-group${isError ? ' wmnds-fe-group--error' : ''}`;
  const textareaClass = `wmnds-fe-textarea${isError ? ' wmnds-fe-input--error' : ''}`;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: `${groupClass} wmnds-m-t-20`
  }, /*#__PURE__*/React__default["default"].createElement("label", {
    className: `wmnds-fe-label wmnds-m-t-20`,
    htmlFor: finalId
  }, label), isError && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-error-message"
  }, errorMessage), /*#__PURE__*/React__default["default"].createElement("textarea", _extends({
    className: textareaClass,
    id: finalId,
    name: name,
    onChange: onChange
  }, textareaProps)));
};

const FileUpload = ({
  onFileUpload,
  onFileRemove,
  selectedFile,
  error,
  inmeg
}) => {
  const handleFileChange = event => {
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
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: `wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`
  }, error && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-error-message"
  }, "File must be less than 2mb"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wmnds-fe-file-upload"
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "file",
    name: "fileUploader",
    id: "fileUploader",
    className: `wmnds-fe-file-upload__input ${selectedFile ? 'wmnds-fe-file-upload__input--file-selected' : ''}`,
    onChange: handleFileChange
  }), /*#__PURE__*/React__default["default"].createElement("label", {
    htmlFor: "fileUploader",
    className: "wmnds-btn wmnds-btn--primary wmnds-fe-file-upload__label",
    onClick: handleRemoveFile
  }, selectedFile ? 'Remove file' : 'Choose file', /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-btn__icon wmnds-btn__icon--right"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: `#${selectedFile ? 'wmnds-general-trash' : 'wmnds-general-paperclip'}`,
    href: `#${selectedFile ? 'wmnds-general-trash' : 'wmnds-general-paperclip'}`
  }))), /*#__PURE__*/React__default["default"].createElement("span", null, selectedFile ? selectedFile.name : 'no file selected')));
};

const Checkboxes = ({
  options,
  title,
  onCheckboxChange,
  hasError,
  errorMessage
}) => {
  const handleCheckboxChange = (value, isChecked) => {
    onCheckboxChange(value, isChecked);
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: `wmnds-fe-group${hasError ? ' wmnds-fe-group--error' : ''}`
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wmnds-fe-checkboxes"
  }, hasError && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-error-message"
  }, errorMessage), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-checkboxes__desc"
  }, title), options.map((option, index) => /*#__PURE__*/React__default["default"].createElement("label", {
    key: index,
    className: "wmnds-fe-checkboxes__container"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wmnds-m-b-lg"
  }, option.label), /*#__PURE__*/React__default["default"].createElement("input", {
    id: `error-checkboxes_option${index + 1}`,
    className: "wmnds-fe-checkboxes__input",
    value: option.value,
    name: `error-checkboxes_option${index + 1}`,
    type: "checkbox",
    defaultChecked: option.checked,
    onChange: e => handleCheckboxChange(option.value, e.target.checked)
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-checkboxes__checkmark"
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "wmnds-fe-checkboxes__icon"
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#wmnds-general-checkmark",
    href: "#wmnds-general-checkmark"
  })))))));
};

const Dropdown = ({
  label,
  id,
  name,
  options,
  hasError,
  errorMessage,
  onSelectChange
}) => {
  const handleSelectChange = event => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };

  // Add the blank default option
  const updatedOptions = [{
    label: 'Choose from the list',
    value: ''
  }, ...options];
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: `wmnds-fe-group ${hasError ? 'wmnds-fe-group--error' : ''}`
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wmnds-fe-dropdown"
  }, hasError && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wmnds-fe-error-message"
  }, errorMessage), /*#__PURE__*/React__default["default"].createElement("label", {
    className: "wmnds-fe-label",
    htmlFor: id
  }, label), /*#__PURE__*/React__default["default"].createElement("select", {
    className: "wmnds-fe-dropdown__select",
    id: id,
    name: name,
    onChange: handleSelectChange
  }, updatedOptions.map(option => /*#__PURE__*/React__default["default"].createElement("option", {
    key: option.value,
    value: option.value
  }, option.label)))));
};

exports.ButtonCta = ButtonCta;
exports.ButtonDestructive = ButtonDestructive;
exports.ButtonFavorite = ButtonFavorite;
exports.ButtonLink = ButtonLink;
exports.ButtonOpenClose = ButtonOpenClose;
exports.ButtonPayment = ButtonPayment;
exports.ButtonPrimary = ButtonPrimary;
exports.ButtonStart = ButtonStart;
exports.Checkboxes = Checkboxes;
exports.Dropdown = Dropdown;
exports.FileUpload = FileUpload;
exports.FormTextarea = FormTextarea;
exports.ModeButton = ModeButton;
exports.Radios = Radios;
exports.SecondaryButton = SecondaryButton;
exports.TextInput = TextInput;