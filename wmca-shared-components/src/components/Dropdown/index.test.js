import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dropdown from '.';

describe('Dropdown Component', () => {
  const options = [
    { value: '', label: 'Choose from list' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
  ];

  describe('Rendering', () => {
    it('should render the dropdown with options', () => {
      render(
        <Dropdown label="Form label" id="dropdown-example" name="dropdown-example" options={options} />
      );

      const dropdownLabel = screen.getByLabelText('Form label');
      expect(dropdownLabel).toBeInTheDocument();

      options.forEach((option) => {
        const optionElement = screen.getByText(option.label);
        expect(optionElement).toBeInTheDocument();
      });
    });

    it('should display error message when hasError prop is true', () => {
      render(
        <Dropdown
          label="Form label"
          id="dropdown-example"
          name="dropdown-example"
          options={options}
          hasError
          errorMessage="Please select an option"
        />
      );

      const errorMessage = screen.getByText('Please select an option');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('should call onSelectChange when an option is selected', () => {
      const onSelectChangeMock = jest.fn();
      render(
        <Dropdown
          label="Form label"
          id="dropdown-example"
          name="dropdown-example"
          options={options}
          onSelectChange={onSelectChangeMock}
        />
      );

      const selectElement = screen.getByLabelText('Form label');
      fireEvent.change(selectElement, { target: { value: '2' } });

      expect(onSelectChangeMock).toHaveBeenCalledWith('2');
    });
  });
});
