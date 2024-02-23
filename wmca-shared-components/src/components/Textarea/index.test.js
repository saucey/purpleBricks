import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from '.';

describe('Textarea Component', () => {
  it('renders the label and textarea correctly', () => {
    render(
      <Textarea
        id="example-textarea"
        name="example-textarea"
        label="Textarea Label"
        placeholder="Textarea placeholder..."
        rows="2"
        maxLength="200"
      />
    );

    const labelElement = screen.getByLabelText('Textarea Label');
    const textareaElement = screen.getByPlaceholderText('Textarea placeholder...');

    expect(labelElement).toBeInTheDocument();
    expect(textareaElement).toBeInTheDocument();
  });

  it('renders with error and custom error message', () => {
    render(
      <Textarea
        id="error-textarea"
        name="error-textarea"
        label="Error Textarea Label"
        isError
        errorMessage="Custom error message"
        placeholder="Textarea placeholder..."
        rows="2"
        maxLength="200"
      />
    );

    const labelElement = screen.getByLabelText('Error Textarea Label');
    const errorMessageElement = screen.getByText('Custom error message');
    const textareaElement = screen.getByPlaceholderText('Textarea placeholder...');

    expect(labelElement).toBeInTheDocument();
    expect(errorMessageElement).toBeInTheDocument();
    expect(textareaElement).toBeInTheDocument();
  });

  it('triggers onChange callback when textarea value changes', () => {
    const mockOnChange = jest.fn();

    render(
      <Textarea
        id="example-textarea"
        name="example-textarea"
        label="Textarea Label"
        onChange={mockOnChange}
        placeholder="Textarea placeholder..."
        rows="2"
        maxLength="200"
      />
    );

    const textareaElement = screen.getByPlaceholderText('Textarea placeholder...');

    fireEvent.change(textareaElement, { target: { value: 'New textarea value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
