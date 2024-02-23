// TextInput.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '.';

describe('TextInput Component', () => {
  it('renders with provided id', () => {
    render(
      <TextInput id="explicit-id" name="example-input" label="Example Input" />
    );

    const inputElement = screen.getByLabelText('Example Input');

    expect(inputElement.id).toBe('explicit-id');
  });

  it('renders with default id when id is not provided', () => {
    render(
      <TextInput name="example-input" label="Example Input" />
    );

    const inputElement = screen.getByLabelText('Example Input');

    // Check if the id follows the expected pattern when auto-generated from the name
    expect(inputElement.id).toMatch(/^example-input$/);
  });

  it('renders with provided id even when name is not provided', () => {
    render(
      <TextInput id="explicit-id" label="Example Input" />
    );

    const inputElement = screen.getByLabelText('Example Input');

    expect(inputElement.id).toBe('explicit-id');
  });

  it('triggers onChange callback when input value changes', () => {
    const mockOnChange = jest.fn();

    render(
      <TextInput name="example-input" label="Example Input" onChange={mockOnChange} />
    );

    const inputElement = screen.getByLabelText('Example Input');

    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });


  it('displays error message when isError is true', () => {
    render(
      <TextInput name="example-input" label="Example Input" isError errorMessage="This field is required." />
    );

    const errorElement = screen.getByText('This field is required.');

    expect(errorElement).toBeInTheDocument();
  });

  it('does not display error message when isError is false', () => {
    render(
      <TextInput name="example-input" label="Example Input" isError={false} errorMessage="This field is required." />
    );

    const errorElement = screen.queryByText('This field is required.');

    expect(errorElement).not.toBeInTheDocument();
  });
});
