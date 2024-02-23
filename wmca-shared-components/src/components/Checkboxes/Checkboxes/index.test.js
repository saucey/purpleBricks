// Checkboxes.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For better assertion messages
import Checkboxes from '.';

describe('Checkboxes component', () => {
  it('renders checkboxes with options and handles checkbox change', () => {
    const options = [
      { label: 'Option 1', value: 'option1', checked: false },
      { label: 'Option 2', value: 'option2', checked: false },
      { label: 'Option 3', value: 'option3', checked: false },
    ];

    const title = 'Select all options that apply';
    const onCheckboxChange = jest.fn();
    const hasError = false;
    const errorMessage = 'Custom error message goes here';

    render(
      <Checkboxes
        options={options}
        title={title}
        onCheckboxChange={onCheckboxChange}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    );

    // Verify that the checkboxes are rendered
    options.forEach((option) => {
      const checkboxLabel = screen.getByText(option.label);
      expect(checkboxLabel).toBeInTheDocument();

      const checkbox = screen.getByLabelText(option.label);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    // Simulate checkbox change
    fireEvent.click(screen.getByLabelText('Option 1'));
    expect(onCheckboxChange).toHaveBeenCalledWith('option1', true);

  });

  it('renders error message when hasError is true', () => {
    const options = [
      { label: 'Option 1', value: 'option1', checked: false },
      { label: 'Option 2', value: 'option2', checked: false },
      { label: 'Option 3', value: 'option3', checked: false },
    ];

    const title = 'Select all options that apply';
    const onCheckboxChange = jest.fn();
    const hasError = true;
    const errorMessage = 'Custom error message goes here';

    render(
      <Checkboxes
        options={options}
        title={title}
        onCheckboxChange={onCheckboxChange}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    );

    // Verify that the error message is rendered
    const errorMessageBox = screen.getByText(errorMessage);
    expect(errorMessageBox).toBeInTheDocument();
  });
});
